#include "hello.h"

const std::string Hello::GetWorld() {
  return world_;
}

void Hello::SetWorld(const std::string world) {
  world_ = world;
}
