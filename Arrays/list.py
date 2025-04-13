def revision():
    myList = []
    for i in range(10):
        myList.append(i*10)
        print(myList[i])
        myList[i] = 0 # O(1)
    print(myList) # O(n)

revision()