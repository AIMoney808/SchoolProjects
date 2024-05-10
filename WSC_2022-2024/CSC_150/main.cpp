#include <ctime>     // used in srand
#include <iostream>  // used in cin/cout etc.
#include <stdexcept> // used in error handling
#include <string>    // used in string format
#include <vector>    // used in vector

#include "mathTutor.h"
using namespace std;

/*************************************************************************
Program:     MathTutor
Programmer:  Aaron Mahoney
Date:        11/24/2022
repl.it      https://replit.com/@aamaho01/CSC150-MathTutorv3#main.cpp
Description: This file contains the main function for
the mathTutor program.
*************************************************************************/

/*************************************************************************
The main displays the menu, and keeps the program looping until the user
wants to quit the game
*************************************************************************/
int main() {
  int choice = 0;
  string inputGarbage = "";
  vector<vector<int>> mathQuestions;

  srand(time(0)); // random seed to current time

  DisplayGameHeader();
  WelcomeUser();

  while ((choice = GetUserMenuChoice())) {

    switch (choice) {
    case 1:
    case 2:
    case 3:
    case 4:
      AskMathQuestion(choice - 1, mathQuestions);
      break;
    case 5:
      DisplayStatusReport(mathQuestions);
      break;
    case 6:
      try {
        SaveCurrentGame(mathQuestions);
      } catch (runtime_error &excpt) {
        cout << endl;
        cout << excpt.what() << endl;
        cout << "Program did NOT end normally: Error -3" << endl;
        return -3;
      }
      break;
    case 7:
      try {
        LoadPreviousGame(mathQuestions);
      } catch (runtime_error &excpt) {
        cout << endl;
        cout << excpt.what() << endl;
        cout << "Program did NOT end normally: Error -4" << endl;
        return -4;
      }
      break;
    case 8:
      mathQuestions.clear();
      cout << "\t"
           << "*Game Reset*" << endl
           << endl;
      break;
    default:
      cout << endl;
      cout << "Invalid Choice: " << choice << endl;
      cout << "Program ended with an -1 error code." << endl;
      cout << "Please contact Princess Debbie Johnson." << endl;
      return -1;
    }

    getline(cin, inputGarbage); // clear anything still in the input buffer
    cout << "******************************************" << endl
         << "* Please press the enter key to continue *" << endl
         << "******************************************";
    getline(cin, inputGarbage); // wait until the user presses the enter key
    cout << endl;
  }

  cout << "I hope you play this game again soon." << endl;
  cout << "Goodbye for now." << endl;

  return 0;
} // end of main() function
