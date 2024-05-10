#include <cstdlib>  // used in srand
#include <ctime>    // used in srand
#include <iomanip>  // used in setw()
#include <ios>      // used in setw()
#include <iostream> // used in cin/cout etc.
#include <limits>   // used in MAX_ATTEMPTS
#include <string>   // used in string format
#include <vector>   // used in vector

using namespace std;

/********************************************************************
Program:     MathTutor
Programmer:  Aaron Mahoney
Date:        09/21/2022
repl.it      https://replit.com/@aamaho01/main#C++/MathTutor.cpp
Description: This Program is a math tutor. Combining two random
numbers as values and one random as the operator to form a problem
that the user must answer correctly. To generate a random opperator
a switch statement with enumeration is used. In combination with
two while loops and two for loops to make it possible to generate
multiple questions. This also uses a constant integer to limit
the number of tries on each question. This program uses a vector
to display a detailed report of the questions and the amount of
attempts taken. Lastly it counts the ammount of questions and
amount of correct answers to couculate the total percent correct.
*********************************************************************/

int main() {
  const int MAX_ATTEMPT = 3; // max ammount of attemts for each question
  enum ValidMathTypes { MT_ADD, MT_SUB, MT_MUL, MT_DIV }; // enum for switch
  vector<vector<int>> mathQuestions; // vector used in detailed report

  int temp = 0;    // this is used to make sure leftNum is greater than rightNum
  int leftNum = 0; // rand number between 1-10
  int rightNum = 0;      // rand number between 1-10
  int opType = 0 - 3;    // rand number between 0-3
  int correctAnswer = 0; // generated answer
  int userAnswer = 0;    // users attempt to answer
  int totalQuest = 0;    // total questions answerd
  int totalCorrect = 0;  // total answers correct
  int totalPerc = 0;     // total percentage
  int attempts = 0;      // count attempts until correct
  char mathOp = '+';     // display oporator
  string UserName = "?"; // user name
  string userCont = "y"; // continue or quit

  cout << "+-------------------------------------------+" << endl
       << "|                 Math Tutor                |" << endl
       << "+-------------------------------------------+" << endl
       << endl; // display the welcome header

  cout << "Please enter your first name: ";
  getline(cin, UserName);
  cout << endl;
  cout << "Hello " << UserName << "!" << endl;
  cout << "You get 3 attempts per question." << endl;
  cout << "Now let the fun begin!" << endl;

  srand(time(0)); // random seed to current time

  while (userCont == "y" || userCont == "yes") { // outer while loop
    cout << endl;
    cout << "+-------------------------------------------+" << endl;
    cout << endl;

    totalQuest++;

    leftNum = rand() % 10 + 1;
    rightNum = rand() % 10 + 1;
    opType = rand() % 4 + 0;

    /********************************
      The if statement below is
      used to make sure leftNum is
      greater than rightNum to
      avoid negative numbers.
    *******************************/
    if (leftNum < rightNum) {
      temp = leftNum;
      leftNum = rightNum;
      rightNum = temp;
    }

    // opType = 0; // for testing puposeses only
    switch (opType) {
    case MT_ADD: // addition
      mathOp = '+';
      correctAnswer = leftNum + rightNum;
      break;
    case MT_SUB: // subtraction
      mathOp = '-';
      correctAnswer = leftNum - rightNum;
      break;
    case MT_MUL: // multiplication
      mathOp = '*';
      correctAnswer = leftNum * rightNum;
      break;
    case MT_DIV: // division
      mathOp = '/';
      leftNum *= rightNum; // Divide logic is different to avoid decimals
      correctAnswer = leftNum / rightNum;
      break;
    default: // Error handling
      cout << "Invalid question type: " << opType << endl;
      cout << "Program ended with an error -1" << endl;
      cout << "Please report this error to Aaron Mahoney." << endl;
      return -1;
      break;
    }

    // vvv vector used to get data from each question
    vector<int> row = {leftNum, opType, rightNum};

    for (int i = 1; i <= MAX_ATTEMPT; i++) {
      cout << "#" << totalQuest << "\t";
      cout << "What does " << leftNum << mathOp << rightNum << " = ";

      while (!(cin >> userAnswer)) { // used to handle for non-numeric input
        cin.clear();                 // clears error flag
        // vvv sets the maximum number of characters to ignore
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
        cout << "\t"
             << "Invalid input!" << endl;
        cout << "\t"
             << "Please enter a number: ";
      }

      if (correctAnswer == userAnswer) { // check if answer is correct
        row.push_back(i);
        totalCorrect++;
        cout << "\t"
             << "Correct :)" << endl;
        cout << endl;
        break;
      } else if (i != MAX_ATTEMPT) { // three attempts
        cout << "\t"
             << "Sorry that was incorrect." << endl;
        cout << "\t"
             << "You have " << MAX_ATTEMPT - i << " attempts left." << endl;
        cout << endl;
      } else { // out of attempts
        row.push_back(0);
        cout << "\t"
             << "Sorry, you are out of attempts." << endl;
        cout << "\t"
             << "The correct answer is " << correctAnswer << "." << endl;
        cout << endl;
      } // end if

    } // end for loop

    mathQuestions.push_back(row);

    while (true) {
      cout << "Do you want another question?(y=yes | n=no): ";
      cin >> userCont; // nocap

      for (int i = 0; i < userCont.size(); i++) {
        userCont.at(i) = tolower(userCont.at(i));
      } // end of for loop

      if (userCont == "y" || userCont == "yes" || userCont == "n" ||
          userCont == "no") {
        break;
      } else {
        cout << "\t"
             << "Invalid input!" << endl;
        cout << "\t"
             << "Please enter y/n or yes/no" << endl;
        cout << endl;
      } // end if else

    } // end inner while

  } // end Outer while
  /*
  for (int i = 0; i < mathQuestions.size(); i++) {
    for (int j = 0; j < mathQuestions.at(i).size(); j++) {
      cout << mathQuestions.at(i).at(j);
    }
    cout << endl;
  } */
  cout << endl;
  cout << "==============================" << endl
       << "   Math Tutor Detail Report   " << endl
       << "==============================" << endl;

  cout << setw(12) << "Questions" << right << setw(16) << "Attempts" << endl;
  cout << setw(16) << "----------------" << right << setw(14) << "------------"
       << endl;

  for (int i = 0; i < mathQuestions.size(); i++) { // output detail report
    leftNum = mathQuestions.at(i).at(0);
    opType = mathQuestions.at(i).at(1);
    rightNum = mathQuestions.at(i).at(2);
    attempts = mathQuestions.at(i).at(3);

    // opType = 0; // for testing puposeses only
    switch (opType) {
    case MT_ADD: // addition
      mathOp = '+';
      correctAnswer = leftNum + rightNum;
      break;
    case MT_SUB: // subtraction
      mathOp = '-';
      correctAnswer = leftNum - rightNum;
      break;
    case MT_MUL: // multiplication
      mathOp = '*';
      correctAnswer = leftNum * rightNum;
      break;
    case MT_DIV: // division
      mathOp = '/';
      correctAnswer = leftNum / rightNum;
      break;
    default: // Error handling
      cout << "Invalid question type: " << opType << endl;
      cout << "Program ended with an error -2" << endl;
      cout << "Please report this error to Aaron Mahoney." << endl;
      return -2;
      break;
    } // end switch

    cout << setw(3) << leftNum << " " << mathOp << " " << setw(3) << left
         << rightNum << " = " << right << setw(3) << correctAnswer;

    if (attempts == 0) {
      cout << setw(14) << right << "Incorrect";
    } else {
      cout << setw(9) << right << attempts;
    } // end if

    cout << endl;

  } // end for loop

  cout << endl;
  cout << "+-------------------------------------------+" << endl;
  cout << endl;

  cout << "Total Questions =" << setw(4) << totalQuest << endl;
  cout << "Total Incorrect =" << setw(4) << totalQuest - totalCorrect << endl;
  cout << "Total Correct   =" << setw(4) << totalCorrect << endl;

  totalPerc = (totalCorrect * 100) / totalQuest;
  cout << "Percent Correct =" << setw(4) << totalPerc << "%" << endl;

  cout << endl;
  cout << "+-------------------------------------------+" << endl;
  cout << endl;

  cout << "I hope you play this game again soon." << endl;
  cout << "Goodbye for now." << endl;

  return 0;
} // end main