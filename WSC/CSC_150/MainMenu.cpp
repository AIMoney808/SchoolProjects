#include <iostream>
#include <string>

using namespace std;

int GetUserMenuChoice() {
  int choice = 0;

  cout << "      Debbie's Menu       " << endl;
	cout << "--------------------------" << endl;
  cout << "   1 = Gumbo" << endl;
  cout << "   2 = Jambalaya" << endl;
	cout << "   ------------" << endl;
  cout << "   0 = Quit" << endl << endl;

  while (true) {
    cout << "Enter choice: ";
    cin >> choice; //ToDo: replace this with a function that validates numeric input

    if (choice >= 0 && choice <= 2)
      break;

    cout << "Invalid input! Please try again..." << endl;
    cout << endl;
  }

	cout << endl;
  return choice;
}

int main() {
	int choice = 0;
	string inputGarbage = "";

	while ((choice = GetUserMenuChoice())) {

    switch (choice) {
    case 1:
      cout << "Order: Gumbo" << endl;
      break;
    case 2:
      cout << "Order: Jambalaya" << endl;
      break;
    default:
			cout << endl;
      cout << "Invalid Choice: " << choice << endl;
			cout << "Program ended with an -1 error code." << endl;
			cout << "Please contact Princess Debbie Johnson." << endl;
      return -1;
    }

		getline(cin, inputGarbage); //clear anything still in the input buffer
		cout << "Please the enter key to continue...";
		getline(cin, inputGarbage); //wait until the user presses the enter key
				
		cout << endl;
		
  }

	cout << "Goodbye" << endl;
      
  return 0;
}