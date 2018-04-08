#ifndef CORE_IDL_TYPES_H_
#define CORE_IDL_TYPES_H_

#include <generator/types/idl_base.h>

struct IDLBoolean final : public IDLBaseHelper<bool> {};
struct IDLByte final : public IDLBaseHelper<int8_t> {};
struct IDLFloat final : public IDLBaseHelper<float> {};
struct IDLDouble final : public IDLBaseHelper<double> {};
struct IDLLongLong final : public IDLBaseHelper<int64_t> {};
struct IDLLong final : public IDLBaseHelper<int32_t> {};
struct IDLOctet final : public IDLBaseHelper<uint8_t> {};
struct IDLShort final : public IDLBaseHelper<int16_t> {};
struct IDLUnsignedShort final : public IDLBaseHelper<uint16_t> {};
struct IDLUnsignedLong final : public IDLBaseHelper<uint32_t> {};
struct IDLUnsignedLongLong final : public IDLBaseHelper<uint64_t> {};
struct IDLString final : public IDLBaseHelper<std::string> {};

#endif  // CORE_IDL_TYPES_H_
