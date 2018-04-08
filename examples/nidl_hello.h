#ifndef EXAMPLES_HELLO_NIDL_H_
#define EXAMPLES_HELLO_NIDL_H_

#include <memory>
#include <napi.h>

#include "hello.h"

class NIDL_Hello : public Napi::ObjectWrap<NIDL_Hello> {
 public:
  static void Init(Napi::Env env, Napi::Object exports);

  explicit NIDL_Hello(const Napi::CallbackInfo& info);

  Napi::Value GetterWorld(const Napi::CallbackInfo& info);

 private:
  std::unique_ptr<Hello> impl_;
};

#endif  // EXAMPLES_HELLO_NIDL_H_
