$().ready(function () {

    // Grab all radio with name 'sex'
    let sex_input = $("input[type='radio'][name='gender']");

    // Store 'sex' selected radio option
    let sex_selected;

    $("#form").validate({
        submitHandler: function (form) {
            $("#btn-submit").prop("disabled", false);
            form.submit();
        },
        invalidHandler: function (event, validator) {

        },
        errorClass: 'error',
        onkeyup: false,
        rules: {
            gender: {
                required: true,
            },
            age: {
                required: true,
                min: 18,
                max: function () {
                    switch (sex_selected) {
                        case "male": {
                            return 64;
                        }
                        case "female": {
                            return 59;
                        }
                        case null: {
                            return 1000;
                        }
                    }
                }
            },
            pension_income: {
                required: true,
                min: function () {
                    let currency = $("#currency");
                    if (currency.val() === "hrn") {
                        return 1000;
                    }
                    if (currency.val() === "usd") {
                        return 28;
                    } else {
                        return 26;
                    }
                },
            },
            pension_age: {
                required: true,
                min: function () {
                    if ($("#age").val() + 1 < 18) {
                        return 18;
                    }
                    return $("#age").val() + 1;
                },
                max: 99,
                minLength: 2
            },
            email: {
                required: true,
                email: true
            },
            number: {
                required: true,
                rangelength: [19, 19],
            },

            resume: {
                extension: "doc|docx|txt"
            },

        },
        messages: {
            required: "\"Заповніть дане поле<sup>*</sup>\"",
            gender: "Оберіть вашу стать<sup>*</sup>",
            age: {
                required: "Заповніть дане поле<sup>*</sup>",
                min: "Ви повинні бути повнолітні<sup>*</sup>",
                max: "Ви занадто старі для нас. Помолодшайте<sup>*</sup>"
            },
            pension_income: {
                required: "Заповніть дане поле<sup>*</sup>",
                min: "Мінімальний розмір пенсії 1000₴/28$/26€<sup>*</sup>"
            },
            pension_age: {
                required: "Заповніть дане поле<sup>*</sup>",
                min: "Вік виходу на пенсію повинен бути" +
                    " більшим" +
                    " ніж ваш" +
                    " поточний<sup>*</sup>",
                max: "Ви надто старі. Перепрошуєм<sup>*</sup>",
                minLength: "Ви повинні бути повнолітні під час виходу на пенсію<sup>*</sup>"
            },
            email: {
                required: "Заповніть дане поле<sup>*</sup>",
                email: "Введіть правильну email адресу<sup>*</sup>"
            },
            number: {
                required: "Заповніть дане поле<sup>*</sup>",
                rangelength: "Введіть вірний номер телефону<sup>*</sup>"
            },
            resume: "Виберіть файл із необхідним форматом (.doc .docx .txt)<sup>*</sup>",
        },
        errorPlacement: function (error, element) {
            switch (element.attr("name")) {
                case "gender": {
                    error.insertAfter(element.parent().parent().parent()
                    );
                    break;
                }
                default: {
                    error.insertAfter(element.parent());
                }

            }
        }
    });


    // // Breaks number input formatting
    // validator.addMethod("numberValidateForContaining0on3rdIndex", function (value, element) {
    //     return $("#number").get().val().at(3) === 0;
    // });


    sex_input.change(function () {
        sex_selected = $(this).val();
        if ($(".age").val() !== "") {
            $("#form").validate().element("#age");
        }
    });

    $(".age").change(function () {
        $("#form").validate().element("#age");
        if ($(".pension_age").val() > 0) {
            $("#form").validate().element("#pension_age");
        }
    });

    $("#currency").change(function () {
        $("#form").validate().element("#pension_income");
    });

})
