function revision() {
    let arr = [];
    // O(n)
    for (let i = 0; i < 5; i++) {
        arr[i] = i*10; // O(1)
        console.log(arr[i]); // O(1)
    }
    console.log(arr); // O(n)
}

revision();