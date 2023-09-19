public class StrSymmetryPoint {
    public int solution(String S) {
        // Implement your solution here
        int length = S.length();

        if (length % 2 == 0) {
            return -1;
        }

        int central = length / 2;
        for (int i = 0; i < central; i++) {
            if (S.charAt(i) != S.charAt(length - i - 1)) {
                return -1;
            }
        }

        return central;
    }
}