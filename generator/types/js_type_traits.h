#ifndef CORE_JS_TYPE_TRAITS_H_
#define CORE_JS_TYPE_TRAITS_H_

#include <napi.h>

template <typename T>
inline Napi::Value JSTypeTraits(Napi::Env env, T value) {
  // This should be unreachable.
  return T();
}

#define JS_TYPE_TRAITS_NUMBER(type)                            \
  template <>                                                  \
  inline Napi::Value JSTypeTraits(Napi::Env env, type value) { \
    return Napi::Number::New(env, value);                      \
  }

#define JS_TYPE_TRAITS_BOOLEAN(type)                           \
  template <>                                                  \
  inline Napi::Value JSTypeTraits(Napi::Env env, type value) { \
    return Napi::Boolean::New(env, value);                     \
  }

#define JS_TYPE_TRAITS_STRING(type)                            \
  template <>                                                  \
  inline Napi::Value JSTypeTraits(Napi::Env env, type value) { \
    return Napi::String::New(env, value);                      \
  }

JS_TYPE_TRAITS_NUMBER(int8_t);
JS_TYPE_TRAITS_NUMBER(uint8_t);
JS_TYPE_TRAITS_NUMBER(int16_t);
JS_TYPE_TRAITS_NUMBER(uint16_t);
JS_TYPE_TRAITS_NUMBER(int32_t);
JS_TYPE_TRAITS_NUMBER(uint32_t);
JS_TYPE_TRAITS_NUMBER(int64_t);
JS_TYPE_TRAITS_NUMBER(uint64_t);
JS_TYPE_TRAITS_NUMBER(float);
JS_TYPE_TRAITS_NUMBER(double);

JS_TYPE_TRAITS_BOOLEAN(bool);

JS_TYPE_TRAITS_STRING(std::string);

#endif  // CORE_JS_TYPE_TRAITS_H_
