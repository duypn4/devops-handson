class Potholes {
    public int solution(String S, int B) {
        int counter = 0;
        int maxPotholes = 0;
        int cost = 0;

        for (char c: S.toCharArray()) {
            cost = 0;
            if (c == 'x') {
                counter++;
            }

            if (counter >= 1) {
                cost = counter + 1;
            }

            if (cost > 0 && cost <= B) {
                maxPotholes = counter;
            }
        }

        return maxPotholes;
    }
}