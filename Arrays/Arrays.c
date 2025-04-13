#include <stdio.h> // this is a header lib file that lets us work with i/o functions

int main(int argc, char const *argv[])
{
    int myNumbers[5]; // declaring an array with 5 elements
    char myStrings[5][20];
    // adding elements O(n)
    printf("elements:\n");
    for (int i = 0; i < 5; i++) {
        myNumbers[i] = i*10;
        sprintf(myStrings[i], "%d", myNumbers[i]);
        printf("integer[%d]: %d\n", i, myNumbers[i]);
        printf("string[%d]: %s\n", i, myStrings[i]);
    }
    // counting the size of the array O(n)
    printf("size of myNumbers:\n");
    printf("%lu\n", sizeof(myNumbers)); // this will print 20 instead of 5 since in 'c', it counts 4 bytes for 1 int element
    printf("%lu\n", sizeof(myNumbers)/sizeof(myNumbers[0])); // this will calculate the exact O(n)
    printf("size of myStrings:\n");
    printf("%lu\n", sizeof(myStrings));
    printf("%lu\n", sizeof(myStrings)/sizeof(myStrings[0]));
    return 0;
}
