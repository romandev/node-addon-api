#include "nidl_hello.h"

void NIDL_Hello::Init(Napi::Env env, Napi::Object exports) {
  Napi::Function js_constructor =
      DefineClass(env, "Hello",
          {
            InstanceAccessor("world", &NIDL_Hello::GetterWorld, nullptr),
          });

  exports.Set("Hello", js_constructor);
}

NIDL_Hello::NIDL_Hello(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<NIDL_Hello>(info) {
  impl_.reset(new Hello());
}

Napi::Value NIDL_Hello::GetterWorld(const Napi::CallbackInfo& info) {
  return Napi::String::New(info.Env(), impl_->getWorld());
}
