.data
	charlist: .asciiz    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	binlist: .asciiz    "01000001" , "01000010" , "01000011" , "01000100" , "01000101" , "01000110" , "01000111" , "01001000" ,
	 "01001001" , "01001010" , "01001011" , "01001100" , "01001101" , "01001110" , "01001111" , "01010000" , "01010001" ,
	  "01010010" , "01010011" , "01010100" , "01010101" , "01010110" , "01010111" , "01011000" , "010111001" , "01011010"

# addrs is a list of the starting addresses for each of the strings

	
main:
addi $t0, #zero, 50 # to hold the index of the array
while :
 bgt $t0,10, exit # if(i>10
 jal printnumbers
addi $t0,$t0,1
j while
exit :
li $v0, 4
la $a0, message
syscall
# End of program
li $v0, 10
syscall
printnumbers :

 # Print the number
 li $v0, 1
move $a0, $t0
 syscall
 # Move to the next line
 li $v0, 4
la $a0, message2
syscall
 # Return to main
jr $ra

