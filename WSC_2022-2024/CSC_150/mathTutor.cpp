#include <cctype>    // used in  tolower()
#include <cstdlib>   // used in srand
#include <fstream>   // for file i/o
#include <iomanip>   // used in setw()
#include <iostream>  // used in cin/cout etc.
#include <limits>    // used in MAX_ATTEMPTS
#include <stdexcept> // for runtime error exception
#include <string>    // used in string format
#include <vector>    // used in vector

using namespace std; // so we don't have to type std::cin etc

/***********************************************************************
Program:  MathTutor
Programmer:  Aaron Mahoney
Date:     12/01/2022
repl.it:  https://replit.com/@aamaho01/CSC150-MathTutorv3#mathTutor.cpp

Description: This file includes the functions for mathTutor main.cpp.
Combining two random numbers as values and one chosen as the operator
to form a problem that the user must answer correctly. Nested within
a wile loop a combination of 10 functions and one switch statement
makes it possible to generate multiple questions. This also uses a
constant integer to limit the number of tries on each question.
This program uses a vector to display a detailed report of the
questions and the amount of attempts taken. Lastly it counts
the ammount of questions and amount of correct answers to
couculate the total percent correct.
***********************************************************************/

const int MAX_ATTEMPTS = 3;
const vector<char> MATH_OPERATORS = {'+', '-', '*', '/'};
const string FILE_NAME = "MathTutor.txt"; // global constact file name for both
                                          // reading and writing to a file
enum MathTypes { MT_ADD, MT_SUBTRACT, MT_MULTIPLY, MT_DIVIDE };

/*************************************************************************
Display the game header banner
*************************************************************************/
void DisplayGameHeader() {

  cout << "+-------------------------------------------+" << endl
       << "|                 Math Tutor                |" << endl
       << "+-------------------------------------------+" << endl
       << endl; // display the welcome header

  return;
} // end of DisplayGameHeader() function

/*************************************************************************
Get the user's name, welcome the user, and display the rules of the game
*************************************************************************/
void WelcomeUser() {
  string userName = "?"; // user name

  cout << "Please enter your first name: ";
  getline(cin, userName);
  cout << endl;
  cout << "Hello " << userName << "!" << endl;
  cout << "You get 3 attempts per question." << endl;
  cout << "Now let the fun begin!" << endl;
  cout << endl;

  return;
} // end of WelcomeUser() function

/*************************************************************************
Display the menu and keep looping until the user enters a valid choice
GetNumericValue is used to validate numeric input
This function returns the user's menu choice
*************************************************************************/
int GetNumericValue() {
  int userInput = 0;

  // loop until the user enters numeric data
  while (!(cin >> userInput)) {
    cin.clear(); // clears the cin error flag
    // need to include the limits library to use numeric_limits
    cin.ignore(numeric_limits<streamsize>::max(),
               '\n'); // ignore max input, up to '\n'
    cout << "\t"
         << "Invalid input!" << endl;
    cout << "\t"
         << "Please enter a number: ";
  } // end of get userInput while loop

  return userInput;
} // end of GetNumericValue() function

/*************************************************************************
Keep looping until the user enters a valid numeric value and then return
the value
*************************************************************************/
int GetUserMenuChoice() {
  int choice = 0;

  cout << "==========================" << endl;
  cout << "  Simple Math Tutor Menu  " << endl;
  cout << "==========================" << endl;
  cout << "   1 = (+) Addition" << endl;
  cout << "   2 = (-) Subraction" << endl;
  cout << "   3 = (x) Multiplication" << endl;
  cout << "   4 = (/) Divide" << endl;
  cout << "--------------------------" << endl;
  cout << "   5 = Status Report" << endl;
  cout << "   6 = Save Current Game" << endl;
  cout << "   7 = Load Previous Game" << endl;
  cout << "   8 = Reset Game" << endl;
  cout << "--------------------------" << endl;
  cout << "   0 = Quit" << endl;
  cout << "--------------------------" << endl;
  cout << endl;

  while (true) {

    cout << "Enter choice: ";
    choice = GetNumericValue();

    if (choice >= 0 && choice <= 8)
      break;

    cout << "Invalid input! Please try again..." << endl;
    cout << endl;
  }

  cout << endl;

  return choice;
} // end of GetUserMenuChoice() function

/*************************************************************************
This function generates the left and right numbers it also makes sure
that the left number is divisible by the right number. This function
returns the newly created row vector which stores the left
number, question type, and right number.
*************************************************************************/
vector<int> CreateQuestion(int questType) {
  int temp = 0;
  int leftNum = 0;
  int rightNum = 0;

  leftNum = rand() % 10 + 1;
  rightNum = rand() % 10 + 1;

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

  if (questType == MT_DIVIDE) // avoid answers like 2.3333....
    leftNum *= rightNum;

  return {leftNum, questType, rightNum}; // return current question as vector
} // end CreateQuestion() function

/*************************************************************************
Based on the data stored in the row vector, this function uses a switch
statement to calculate what the correct answer
should be and returns the value
*************************************************************************/
int GetCorrectAnswer(const vector<int> &row) {
  int leftNum = row.at(0);
  int questType = row.at(1);
  int rightNum = row.at(2);
  int correctAnswer = 0;

  // questType = 999; // for test purposes
  switch (questType) {
  case MT_ADD: // addition
    correctAnswer = leftNum + rightNum;
    break;
  case MT_SUBTRACT: // subtraction
    correctAnswer = leftNum - rightNum;
    break;
  case MT_MULTIPLY: // multiplication
    correctAnswer = leftNum * rightNum;
    break;
  case MT_DIVIDE: // division
    correctAnswer = leftNum / rightNum;
    break;
  default: // Error handling
    cout << "Unable to get the correct Answer: -2 Error Code" << endl;
    cout << "Invalid question type: " << questType << endl;
    exit(-2); // end the program immediately (do NOT return -2)
  }

  return correctAnswer;
} // end GetCorrectAnswer() function

/************************************************************************************
This function uses the MATH_OPERATORS vector to determine what math operator
to display (+, -, *, /) based on the questType. It calls CreateQuestion
to build the row vector that contains the leftNum and rightNum. It also calls
GetCorrectAnswer based on the row vector. Then it uses a for loop to give the
user three attempts. GetNumericvalue is use to get valid numeric values.
Finally, it adds the row vector to the 2D vector.
************************************************************************************/
void AskMathQuestion(int questType, vector<vector<int>> &mathQuestions) {

  char questOp = MATH_OPERATORS.at(questType);

  // cout << questOp << endl;

  vector<int> row = CreateQuestion(questType);

  int leftNum = row.at(0);
  int rightNum = row.at(2);
  int correctAnswer = GetCorrectAnswer(row);
  int questNum = mathQuestions.size() + 1;

  for (int i = 1; i <= MAX_ATTEMPTS; i++) {
    cout << "#" << questNum << "\t";
    cout << "What does " << leftNum << questOp << rightNum << " = ";

    if (correctAnswer == GetNumericValue()) { // check if answer is correct
      row.push_back(i); // store users attemtps in row vector
      // totalCorrect++;
      cout << "\t"
           << "Correct :)" << endl;
      cout << endl;
      break;
    } else if (i != MAX_ATTEMPTS) { // three attempts
      cout << "\t"
           << "Sorry that was incorrect." << endl;
      cout << "\t"
           << "You have " << MAX_ATTEMPTS - i << " attempts left." << endl;
      cout << endl;
    } else {            // out of attempts
      row.push_back(0); // store 0 = invalid
      cout << "\t"
           << "Sorry, you are out of attempts." << endl;
      cout << "\t"
           << "The correct answer is " << correctAnswer << "." << endl;
      cout << endl;
    } // end if

  } // end for loop

  mathQuestions.push_back(row); // store current question in the 2d vector

  return;
} // end AskMathQuestion() function

/************************************************************************************
This function uses the 2D vector, to display the detail report. If the 2D vector
contains no data, it displays a message and returns back to main. Total quesions
is calculated based on the size of the 2D vector. Total correct is calculated
based on the user's attempts. After display the detail report, it also displays
a summary report.
************************************************************************************/
void DisplayStatusReport(const vector<vector<int>> &mathQuestions) {
  int leftNum = 0;
  int mathType = 0;
  int rightNum = 0;
  int correctAnswer = 0;
  int attempts = 0;
  int totalCorrect = 0;
  int totalQuestions = 0;
  int totalPerc = 0;
  char questOp = '?';

  totalQuestions = mathQuestions.size();

  if (totalQuestions == 0) {
    cout << "\t"
         << "No questions to report." << endl
         << endl;
    return;
  }

  cout << endl;
  cout << "==============================" << endl
       << "   Math Tutor Detail Report   " << endl
       << "==============================" << endl;

  cout << setw(12) << "Questions" << right << setw(16) << "Attempts" << endl;
  cout << setw(16) << "----------------" << right << setw(14) << "------------"
       << endl;

  for (int i = 0; i < mathQuestions.size(); i++) { // output detail report
    leftNum = mathQuestions.at(i).at(0);
    mathType = mathQuestions.at(i).at(1);
    rightNum = mathQuestions.at(i).at(2);
    attempts = mathQuestions.at(i).at(3);

    questOp = MATH_OPERATORS.at(mathType);
    correctAnswer = GetCorrectAnswer(mathQuestions.at(i));

    cout << setw(3) << leftNum << " " << questOp << " " << setw(3) << left
         << rightNum << " = " << right << setw(3) << correctAnswer;

    if (attempts == 0) {
      cout << setw(14) << right << "Incorrect";
    } else {
      cout << setw(9) << right << attempts;
      totalCorrect++;
    } // end if

    cout << endl;

  } // end for loop

  cout << endl;
  cout << "=======================" << endl;
  cout << "        SUMMARRY       " << endl;
  cout << "-----------------------" << endl;
  cout << endl;

  cout << "Total Questions =" << setw(4) << totalQuestions << endl;
  cout << "Total Incorrect =" << setw(4) << totalQuestions - totalCorrect
       << endl;
  cout << "Total Correct   =" << setw(4) << totalCorrect << endl;

  totalPerc = (totalCorrect * 100) / totalQuestions; // calculates percentage
  cout << "Percent Correct =" << setw(4) << totalPerc << "%" << endl;

  cout << endl;
  cout << "-----------------------" << endl;
  cout << endl;

  return;
} // end DisplayStatusReport() function

/************************************************************************************
Writes the 2D vector to a file named MathTutor.txt
The data contains the following information:
leftNum, questType, rightNum, attempts
************************************************************************************/
void SaveCurrentGame(const vector<vector<int>> &mathQuestions) {
  ofstream outFS; // Output file stream handle

  if (mathQuestions.size() == 0) {
    cout << "\t"
         << "No question to save." << endl
         << endl;
    return;
  }

  cout << "saving game please wait..." << endl;

  outFS.open(FILE_NAME);

  if (!outFS.is_open()) {
    throw runtime_error("Could not open file " + FILE_NAME + " for writing");
  }

  for (int i = 0; i < mathQuestions.size(); i++) {
    outFS << mathQuestions.at(i).at(0) << " " << mathQuestions.at(i).at(1)
          << " " << mathQuestions.at(i).at(2) << " "
          << mathQuestions.at(i).at(3) << endl;
  }
  // Done with file, so close it
  outFS.close();

  cout << "saved " << mathQuestions.size() << " questions to " << FILE_NAME
       << endl;
  cout << "save complete" << endl;

  return;
} // end of SaveCurrentGame() function

/************************************************************************************
Read a file named MathTutor.txt
Makes sure the 2D vector is empty before it loads the previous game data:
leftNum, questType, rightNum, attempts
************************************************************************************/
void LoadPreviousGame(vector<vector<int>> &mathQuestions) {
  int leftNum = 0;
  int mathType = 0;
  int rightNum = 0;
  int attempts = 0;

  ifstream inFS; // Input stream file handle

  // make sure the vectors are empty before loading the file
  mathQuestions.clear();

  inFS.open(FILE_NAME);

  if (!inFS.is_open()) {
    cout << "\t"
         << "No previous game to load" << endl
         << endl;

    return;
  }

  while (inFS >> leftNum >> mathType >> rightNum >> attempts) {
    mathQuestions.push_back({leftNum, mathType, rightNum, attempts});
  }

  if (!inFS.eof()) {
    throw runtime_error("Something went wrong with reading the " + FILE_NAME +
                        " file.");
  }

  // Done with file, so close it
  inFS.close();

  return;
} // end of LoadPreviousGame() function
