.data
letters: .asciiz "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
binary: .asciiz    "01000001" , "01000010" , "01000011" , "01000100" , "01000101" , "01000110" , "01000111" , "01001000" ,
	 "01001001" , "01001010" , "01001011" , "01001100" , "01001101" , "01001110" , "01001111" , "01010000" , "01010001" ,
	  "01010010" , "01010011" , "01010100" , "01010101" , "01010110" , "01010111" , "01011000" , "010111001" , "01011010"
message: .asciiz "Enter a capital letter (A-Z): "
newline: .asciiz "\n"

.text
.globl main
main:
    li $v0, 4       # print message
    la $a0, message
    syscall
    
input:
    li $v0, 12      # read character input
    syscall
    move $t0, $v0   # save user input in $t0
    
    li $t1, 0       # initialize loop counter to 0
    la $t2, letters  # load address of letters array into $t2
    
loop:
    lb $t3, ($t2)   # load current letter from array
    beq $t0, $t3, display_binary # if user input matches letter, jump to display_binary function
    
    addi $t1, $t1, 1     # increment loop counter
    addi $t2, $t2, 1     # move to next letter in array
    blt $t1, 26, loop    # if not end of array, continue looping
    j end_program        # if end of array, jump to end_program function
    
display_binary:
    li $v0, 4       # print binary output
    la $a0, binary
    syscall
    
    li $v0, 4       # print newline
    la $a0, newline
    syscall
    
    j input         # jump back to input function to allow for more user input
    
end_program:
    li $v0, 10      # exit program
    syscall
