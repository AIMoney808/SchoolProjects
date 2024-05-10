.data
hellostring:	.ascii "Hello "
		.asciiz "World!\n"

.text

main:
	la	$a0, hellostring
	li	$v0, 4
	syscall

	li	$v0, 10
	syscall