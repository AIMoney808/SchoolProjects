/***********************************************************
Description: This program is demoes how to read and write 
multiple vectors to a file and display it.

Programmer: Debbie Johnson
Written: 2021.12.01
***********************************************************/
#include <iostream>  // for cout, fixed, showpoint, right, left
#include <string> 	 // for string
#include <fstream>	 // for file i/o
#include <iomanip>	 // for setw, setprecision
#include <vector>	   // for vector
#include <stdexcept> // for runtime error exception

using namespace std;

//global constact file name for both reading and writing to a file
const string FILE_NAME = "myFile.txt";

/***********************************************************
This function is used to save multiple vectors to a file
***********************************************************/
void SaveMyVector(const vector<string>& names,
                  const vector<int>& years,
                  const vector<double>& payments) {

    ofstream outFS; // Output file stream handle

    outFS.open("myFile.txt");

    if (!outFS.is_open()) {
        throw runtime_error("Could not open file " + FILE_NAME + " for writing");
    }

    for(int i = 0; i < names.size(); i++) {
        outFS << names.at(i) << " " << years.at(i) << " " << payments.at(i) << endl;
    }

    // Done with file, so close it
    outFS.close();

    return;
}

/***********************************************************
This function is used to load multiple vectors from a file
***********************************************************/
void LoadMyVector(vector<string>& names,
                  vector<int>& years,
                  vector<double>& payments){

    string inName = "?";
    int inYear = 0;
    double inPayment = 0.0;

    ifstream inFS; // Input stream file handle

	// make sure the vectors are empty before loading the file
    names.clear();
    years.clear();
    payments.clear();

    inFS.open(FILE_NAME);
    if (!inFS.is_open()) {
        throw runtime_error("Could not open file " + FILE_NAME + " for reading");
    }

    while (inFS >> inName >> inYear >> inPayment) {
        names.push_back(inName);
        years.push_back(inYear);
        payments.push_back(inPayment);
    }

    if (!inFS.eof()) {
        throw runtime_error("Something went wrong with reading the " + FILE_NAME + " file.");
    }

    // Done with file, so close it
    inFS.close();

}

/***********************************************************
This function is used for to display all vectors info 
using both rows and columns with proper formattting. 
***********************************************************/
void DisplayMyVector(const vector<string>& names,
                     const vector<int>& years,
                     const vector<double>& payments) {

    cout << setw(10) << left << "Names" << " " << setw(10) << right << "Years" << " " << setw(10) << right<< "Payments" << endl;
    cout << setfill('=');
    cout << setw(10) << "" << " " << setw(10) << "" << " " << setw(10) << "" << endl;
    cout << setfill(' ');

    cout << fixed << showpoint << setprecision(2);

    for(int i = 0; i < names.size(); i++) {
        cout << setw(10) << left << names.at(i) << " " << setw(10) << right << years.at(i) << " " << setw(10) << right << payments.at(i) << endl;
    }

}

/***********************************************************
This function is used for testing that we can both
read and write multiple vectors to a file, plus display it.
***********************************************************/
int main() {

    vector<string> names = {"Debbie", "Sam"};
	
    vector<int> years = {5, 10};
	
    vector<double> payments = {100.50, 35.46};

    try {
        SaveMyVector(names, years, payments);
    } catch (runtime_error& excpt) {
        cout << excpt.what() << endl;
        cout << "Program did NOT end normally: Error -1" << endl;
			  return -1;
    }

    DisplayMyVector(names, years, payments);

    try {
        LoadMyVector(names, years, payments);
    } catch (runtime_error& excpt) {
        cout << excpt.what() << endl;
        cout << "Program did NOT end normally. Error -2" << endl;
			  return -2;
    }

    return 0;
}
