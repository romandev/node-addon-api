{
  "targets": [
    {
      "target_name": "calculator",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "sources": [
        "calculator.h",
        "<!@(node -p \"require('node-addon-api').generate()\")"
      ]
    }
  ]
}
