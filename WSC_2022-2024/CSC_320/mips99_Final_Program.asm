.data
letters: .asciiz "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
binaries: .asciiz    "01000001" , "01000010" , "01000011" , "01000100" , "01000101" , "01000110" , "01000111" , "01001000" ,
	 "01001001" , "01001010" , "01001011" , "01001100" , "01001101" , "01001110" , "01001111" , "01010000" , "01010001" ,
	  "01010010" , "01010011" , "01010100" , "01010101" , "01010110" , "01010111" , "01011000" , "010111001" , "01011010"
input_prompt: .asciiz " Enter a capital letter (A-Z): "
output_prefix: .asciiz " The binary representation of "
output_suffix: .asciiz " is: "

.text
main:
    li $t0, 1       # set loop counter to 1
    j input          # jump to input function
    
compare:
    la $t1, letters  # load address of letters array
    addi $t2, $0, 0  # set index of letters array to 0
    
compare_loop:
    lb $t3, ($t1)    # load byte from letters array
    beq $t3, $a0, print_binary # if byte matches input, jump to print_binary
    addi $t1, $t1, 1 # increment letters array index
    addi $t2, $t2, 1 # increment counter
    bne $t2, 26, compare_loop # if end of letters array not reached, continue loop
    j input         # if end of letters array reached, jump back to input function
    
print_binary:
    la $t1, binaries # load address of binaries array
    add $t1, $t1, $t2 # add index of matching letter to binaries array address
    la $a0, output_prefix # load prefix string
    li $v0, 4      # syscall to print string
    syscall
    move $a0, $t3  # move matched letter to $a0
    li $v0, 11     # syscall to print char
    syscall
    la $a0, output_suffix # load suffix string
    li $v0, 4      # syscall to print string
    syscall
    la $a0, ($t1)  # load binary string from binaries array
    li $v0, 4      # syscall to print string
    syscall
    j input        # jump back to input function
    
input:
    la $a0, input_prompt  # load input prompt string
    li $v0, 4      # syscall to print string
    syscall
    li $v0, 12     # syscall to read character
    syscall
    beq $v0, 10, end_program # if user input is newline, end program
    blt $v0, 65, input     # if user input is below A, jump back to input function
    bgt $v0, 90, input     # if user input is above Z, jump back to input function
    addi $a0, $v0, 0       # move user input to $a0
    jal compare            # jump to compare function
    addi $t0, $t0, 1       # increment loop counter
    j main                 # jump back to main function
    
end_program:
    li $v0, 10     # syscall to exit
