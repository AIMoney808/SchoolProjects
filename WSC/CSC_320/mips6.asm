.data
#Arrays and RAM
myArray: .space 12 #access space in RAM - how many numbers do you want to store? Integer = 4bytes
.text
addi $s0, $zero, 4 #currently in registers
addi $s1, $zero, 10
addi $s2, $zero, 12
#now move them to RAM
#Create index first
addi $t0, $zero, 0 #first clear
sw $s0, myArray($t0) #first position in array
#now update the index - offset
addi $t0, $t0, 4 #move 4
sw $s1, myArray($t0) #store in next index (offset)
addi $t0, $t0, 4 #move 4
sw $s2, myArray($t0)
#now retreive value from RAM
#grab first value first use load word
lw $t6, myArray($zero)
li $v0, 1
addi $a0, $t6, 0
syscall
