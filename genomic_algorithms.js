function PATTERN_COUNT(text, pattern) {
    let occurance = 0
    for(let count=0; count<text.length-pattern.length; count++) {
        let current_pattern = text.substring(count, count+pattern.length);
        if(current_pattern === pattern) {
            occurance = occurance + 1;
        }
    }
    return occurance;
}

function FREQUENT_WORD(text, k) {
    let frequent_patterns = []
    let patterns_counts = {}
    let max_count = -1
    for(i=0; i<text.length-k;i++) {
        let pattern = text.substring(i, i+k)
        let pattern_count = PATTERN_COUNT(text, pattern)
        patterns_counts[pattern] = pattern_count
        if (max_count < pattern_count) {
            max_count = pattern_count
        }
    }
    for(i=0; i<text.length;i++) {
        let pattern = text.substring(i, i+k)
        let pattern_count = PATTERN_COUNT(text, pattern)
        if (pattern_count == max_count) {
            frequent_patterns.push(pattern)
        }
    }
    return frequent_patterns
    
}

let nucleotides_numerical = {"A":0, "C":1, "G":2, "T":3}
let nucleotides_numerical_reverse = {0:"A", 1:"C", 2:"G", 3: "T"}

function PATTERN_TO_NUMBER(pattern) {
    if (pattern.length == 0) {
        return 0
    } else {
        let prefix = pattern.substring(0, pattern.length-1)
        let suffix = pattern.substring(pattern.length-1, pattern.length)
        return 4 * PATTERN_TO_NUMBER(prefix) + nucleotides_numerical[suffix]
    }
}

function NUMBER_TO_PATTERN(number, k) {
    let quotient = number / 4
    let result = ""
    let remainder = 0
    while (Math.trunc(quotient) > 0) {
        remainder = Math.trunc(number % 4)
        result = nucleotides_numerical_reverse[remainder] + result 
        number = quotient
        quotient = quotient / 4
        k = k-1
    }
    result = nucleotides_numerical_reverse[remainder] + result 
    result = result + "A".repeat(k-1)
    return result
}

function FINDING_FREQUENT_WORDS_BY_SORTING(text, k) {
    let count_array = {}
    let index_array = []
    let frequent_patterns = []
    let pattern = null

    for(i=0; i<text.length-k;i++) {
        let pattern = text.substring(i, i+k)
        let current_number = PATTERN_TO_NUMBER(pattern)
        index_array[i] = current_number
        count_array[i] = 1
    }
    index_array = index_array.sort((a, b) => a-b)
    for(i=1; i<index_array.length; i++) {
        if (index_array[i] === index_array[i-1]) {
            count_array[i] = count_array[i-1] + 1
        
        }
    }
    let max_count = Math.max(...Object.values(count_array))
    console.log(max_count)
    for(i=0;i<index_array.length;i++) {
        if (count_array[i] == max_count) {
            pattern = NUMBER_TO_PATTERN(index_array[i], k)
            frequent_patterns.push(pattern)
        }
    }
    return frequent_patterns
}

console.log(FINDING_FREQUENT_WORDS_BY_SORTING("AAGCAAAGGGTGGG", 2))