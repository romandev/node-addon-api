#include <string>

#ifndef EXAMPLES_HELLO_H_
#define EXAMPLES_HELLO_H_

class Hello {
  public:
    void SetWorld(const std::string world);
    const std::string GetWorld();

  private:
    std::string world_;
};

#endif  // EXAMPLES_HELLO_H_
