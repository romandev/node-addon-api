# AsyncWorker

`AsyncWorker` is an abstract class that you can subclass to remove many of the
tedious tasks of moving data between the event loop and worker threads. This
class internally handles all the details of creating and executing an asynchronous
operation.

Once created, execution is requested by calling `Queue`. When a thread is
available for execution the `Execute` method will be invoked.  Once `Execute`
complets either `OnOK` or `OnError` will be invoked.  Once the `OnOK` or 
`OnError` methods are complete the AsyncWorker instance is destructed.

For the most basic use, only the `Execute` method must be implemented in a
subclass.

## Methods

### MakeCallback

This method is used to call from native code back into JavaScript after
returning from an async operation (when there is no other script on the stack).

```cpp
Value MakeCallback() const
```

Returns a `Value` representing the JavaScript object returned.

### MakeCallback

This method is used to call from native code back into JavaScript after
returning from an async operation (when there is no other script on the stack).

```cpp
Value MakeCallback(const Object& receiver) const
```

- `[in] receiver`: The `this` object passed to the callback.

Returns a `Value` representing the JavaScript object returned.

### MakeCallback

This method is used to call from native code back into JavaScript after
returning from an async operation (when there is no other script on the stack).

```cpp
Value MakeCallback(const std::initializer_list<napi_value>& args) const
```

- `[in] args`: Initializer list of JavaScript values as `napi_value` representing the arguments to the callback.

Returns a `Value` representing the JavaScript object returned.

### MakeCallback

This method is used to call from native code back into JavaScript after
returning from an async operation (when there is no other script on the stack).

```cpp
Value MakeCallback(const Object& receiver, const std::initializer_list<napi_value>& args) const
```

- `[in] receiver`: The `this` object passed to the callback.
- `[in] args`: Initializer list of JavaScript values as `napi_value` representing the arguments to the callback.

Returns a `Value` representing the JavaScript object returned.

### Constructor

Creates a new `AsyncContext`.

```cpp
explicit AsyncContext(const char* resource_name, const Function& callback);
```

- `[in] resource_name`: Null-terminated strings that represents the
identifier for the kind of resource that is being provided for diagnostic
information exposed by the async_hooks API.
- `[in] callback`: The function which will be called when an asynchronous
operations ends.

Returns an AsyncContext instance which can later make the given callback by
`MakeCallback()` method.

### Constructor

Creates a new `AsyncContext`.

```cpp
explicit AsyncContext(const char* resource_name, const Object& resource, const Function& callback);
```

- `[in] resource_name`: Null-terminated strings that represents the
identifier for the kind of resource that is being provided for diagnostic
information exposed by the async_hooks API.
- `[in] resource`: Object associated with the asynchronous operation that
will be passed to possible async_hooks.
- `[in] callback`: The function which will be called when an asynchronous
operations ends.

Returns an AsyncContext instance which can later make the given callback by
`MakeCallback()` method.

### Destructor

The async context to be destroyed.

```cpp
virtual ~AsyncContext();
```

## Example

The first step to use the `AsyncWorker` class is to create a new class that inherit
from it and implement the `Execute` abstract method. Typically input to your
worker will be saved within class' fields generally passed in through its
constructor.

When the `Execute` method completes without errors the `OnOK` function callback
will be invoked. In this function the results of the computation will be
reassembled and returned back to the initial JavaScript context.

`AsyncWorker` ensures that all the code in the `Execute` function runs in the
background out of the **event loop** thread and at the end the `OnOK` or `OnError`
function will be called and are executed as part of the event loop.

The code below show a basic example of `AsyncWorker` the implementation:

```cpp
#include<napi.h>

#include <chrono>
#include <thread>

use namespace Napi;

class EchoWorker : public AsyncWorker {
    public:
        EchoWorker(Function& callback, std::string& echo)
        : AsyncWorker(callback), echo(echo) {}

        ~EchoWorker() {}
    // This code will be executed on the worker thread
    void Execute() {
        // Need to simulate cpu heavy task
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    void OnOK() {
        HandleScope scope(Env());
        Callback().Call({Env().Null(), String::New(Env(), echo)});
    }

    private:
        std::string echo;
};
```

The `EchoWorker`'s contructor calls the base class' constructor to pass in the
callback that the `AsyncWorker` base class will store persistently. When the work
on the `Execute` method is done the `OnOk` method is called and the results return
back to JavaScript invoking the stored callback with its associated environment.

The following code shows an example on how to create and and use an `AsyncWorker`

```cpp
Value Echo(const CallbackInfo& info) {
    // You need to check the input data here
    Function cb = info[1].As<Function>();
    std::string in = info[0].As<String>();
    EchoWorker* wk = new EchoWorker(cb, in);
    wk->Queue();
    return info.Env().Undefined();
```

Using the implementation of an `AsyncWorker` is straight forward. You need only create
a new instance and pass to its constructor the callback you want to execute when
your asynchronous task ends and other data you need for your computation. Once created the
only other action you have to do is to call the `Queue` method that will that will
queue the created worker for execution.
