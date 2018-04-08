#include "nidl.h"

#include "nidl_hello.h"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  NIDL_Hello::Init(env, exports);
  return exports;
}

NODE_API_MODULE(nidl, Init);
