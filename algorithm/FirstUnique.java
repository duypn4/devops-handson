import java.util.HashMap;

public class FirstUnique {
    public int solution(int[] A) {
        // Implement your solution here
        int uniqueNum = -1;
        HashMap<Integer, Integer> indexMap = new HashMap<Integer, Integer>();

        for (int i = 0; i < A.length; i++) {
            indexMap.put(A[i], indexMap.getOrDefault(A[i], 0) + 1);
        }

        for (int i = 0; i < A.length; i++) {
            if (indexMap.get(A[i]) == 1) {
                uniqueNum = A[i];
                break;
            }
        }

        return uniqueNum;
    }
}