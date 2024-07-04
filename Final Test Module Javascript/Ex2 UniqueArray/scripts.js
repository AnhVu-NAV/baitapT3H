function uniqueElements(arr1, arr2) {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    
    const uniqueFromArr1 = arr1.filter(item => !set2.has(item));
    const uniqueFromArr2 = arr2.filter(item => !set1.has(item));
    
    return [...uniqueFromArr1, ...uniqueFromArr2];
}


const A1 = [1, 2, "a"];
const A2 = [1, 3, "b"];
const result = uniqueElements(A1, A2);
console.log(result); // Output: [2, "a", "b", 3]
