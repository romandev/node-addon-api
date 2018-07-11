# AsyncContext

The `AsyncWorker` class may not be appropriate for every scenario, because with those the async execution still happens on the main event loop. When using any other async mechanism, introducing a new class `AsyncContext` is necessary to ensure an async operation is properly tracked by the runtime. The class provides `MakeCallback()` method to properly restore the correct async execution context.

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
