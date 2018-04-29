#include "napi.h"

using namespace Napi;

namespace {

static AsyncContext* context;

static void CreateAsyncContext(const CallbackInfo& info) {
  Function callback = info[0].As<Function>();
  context = new AsyncContext("TestResource", callback);
}

static void MakeCallback(const CallbackInfo& info) {
  context->MakeCallback();
  delete context;
}

} // end anonymous namespace

Object InitAsyncContext(Env env) {
  Object exports = Object::New(env);
  exports["createAsyncContext"] = Function::New(env, CreateAsyncContext);
  exports["makeCallback"] = Function::New(env, MakeCallback);
  return exports;
}
