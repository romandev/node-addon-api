#include "hello.h"

const std::string Hello::GetWorld() {
  return world;
}

void Hello::SetWorld(const std::string world) {
  Hello::world = world;
}

