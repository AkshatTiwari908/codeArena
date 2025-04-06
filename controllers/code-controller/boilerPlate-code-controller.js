export const boilerCode = async (req, res) => {
    try {
      const lang = req.params.lang.toLowerCase()
  
      if (lang !== "cpp" && lang !== "java" && lang !== "python") {
        return res.status(400).json({ message: "Language unsupported" })
      }
  
      const boiler = await generateBoilerCode(lang)
      return res.status(200).json({ boilerCode: boiler })
  
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }
  
  // Boilerplate code generator
  const generateBoilerCode = async (lang) => {
    if (lang === "cpp") {
      return `#include <iostream>
  using namespace std;
  
  int main() {
      // Your code here
      return 0;
  }`
    } else if (lang === "java") {
      return `public class Main {
      public static void main(String[] args) {
          // Your code here
      }
  }`
    } else if (lang === "python") {
      return `def main():
      # Your code here
      pass
  
  if __name__ == "__main__":
      main()`
    }
  }
  