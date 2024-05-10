#include <vector>

using namespace std;

/********************************************************************
Program:     MathTutor
Programmer:  Aaron Mahoney
Date:        12/01/2022
repl.it      https://replit.com/@aamaho01/CSC150-MathTutorv3#mathTutor.h
Description: This file is the header for the mathTutor program. This
includes the functions in mathTutor.cpp.
*********************************************************************/

#ifndef MATHTUTOR_H
#define MATHTUTOR_H

void DisplayGameHeader();
void WelcomeUser();
int GetNumericValue();
int GetUserMenuChoice();
vector<int> CreateQuestion(int questType);
int GetCorrectAnswer(const vector<int> &row);
void AskMathQuestion(int questType, vector<vector<int>> &mathQuestions);
void DisplayStatusReport(const vector<vector<int>> &mathQuestions);
void SaveCurrentGame(const vector<vector<int>> &mathQuestions);
void LoadPreviousGame(vector<vector<int>> &mathQuestions);

#endif