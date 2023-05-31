$(document).ready( function () {

    $("#number").on("input", function () {

        // Change format number depend on its' length
        // Row value
        let number = $(this).val();

        // Replace all non-digit values. Force input field to claim only digits
        number = number.replace(/[a-zA-Z]+/g, '');

        // Format number depends on its' length
        switch (true) {

            // Clear all additional symbols if all digits clear
            case (number.length === 0 ||
                number === "+38 ()"): {
                $(this).val("");
                break;
            }

            case (number.length === 1): {
                $(this).val("+38 (" + number + ")");

                // Move caret inside the parenthesis after digit input
                $(this)[0].setSelectionRange($(this).val().length - 1, $(this).val().length - 1);
                break;
            }
            case (number.length < 10): {
                $(this).val("+38 (" + number.substring(5, 9).replace(")", "") + ")");

                // Move caret inside the parenthesis after digit input
                if (number.length < 9) {
                    $(this)[0].setSelectionRange(number.length - 1, number.length - 1);

                    // If all 3 digit input move caret outside the parenthesis
                } else {
                    $(this)[0].setSelectionRange(number.length, number.length);
                }
                break;
            }

            // Add whitespace after parenthesis
            case (number.length < 15): {
                $(this).val(number.substring(0, 9) + " " + number.substring(9).replace(" ", ""));
                if (number.endsWith(" ")) {
                    $(this).val(number.substring(0, number.length - 1));
                    $(this)[0].setSelectionRange($(this).val().length - 1, $(this).val().length - 1);
                }
                break;
            }

            // Add hyphen after 7th and 8th digits input
            case (number.length < 18): {
                $(this).val(number.substring(0, 13) + "-" + number.substring(13).replace("-", ""));
                if (number.at(number.length - 2) === "-") {
                    $(this).val(number.replace("-", ""));
                }
                break;
            }

            // Add hyphen after 9th and 10th digits input
            case (number.length < 20): {
                $(this).val(number.substring(0, 16) + "-" + number.substring(16, 19).replace("-", ""));
                if (number.at(number.length - 2) === "-") {
                    $(this).val(number.slice(0, number.length - 2) + number.at(number.length - 1));
                }
                break;
            }

            // Trim input
            default: {
                $(this).val(number.substring(0, 19));
            }
        }

        $(this).on("blur", function () {
            // Clear number
            number = number.replace("(", "");
            number = number.replace(")", "");
            number = number.replace("(", "");
            number = number.replace(" ", "");
            number = number.replace(" ", "");
            number = number.replace("-", "");
            number = number.replace("-", "");

            $(this).val(number.substring(0, 3) + " " + "(" + number.substring(3, 6) + ") " + number.substring(6, 9) + "-" + number.substring(9, 11) + "-" + number.substring(11, 13));

            $("#form").validate().element("#number");

        });
    });
})
