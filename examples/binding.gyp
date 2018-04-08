{
  "targets": [
    {
      "target_name": "hello",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
      "include_dirs": [
        "<!@(node -p \"require('../').include\")"
      ],
      "sources": [
        "hello.cc",
        "hello.h",
        "nidl.cc",
        "nidl.h",
        "nidl_hello.cc",
        "nidl_hello.h",
        "<!@(node -p \"require('../').generate()\")"
      ]
    }
  ]
}
