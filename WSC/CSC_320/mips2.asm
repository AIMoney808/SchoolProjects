.data
	#how to get user input (floats)
	prompt:    .asciiz "Enter the value of PI: "
	#no load immediate for float so creae a zero register for float
	floatZero: .float 0.0
.text
	#get float zero
	lwc1 $f4, floatZero
	
	#prompt user
	li $v0, 4
	la $a0, prompt
	syscall
	
	#get user input
	li $v0, 6 #code to get aa float from user store in f0
	syscall
	
	#display value
	li $v0, 2 #display a float
	add.s $f12, $f0, $f4
	syscall
