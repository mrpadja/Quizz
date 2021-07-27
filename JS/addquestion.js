function addQuestion(event){
    event.preventDefault()
    let formData = new FormData();

    files = event.target.files


    let form = $('#form_questions').serializeArray();
    $.each(form, function(key, input){
        formData.append(input.name, input.value)
    })


    let img= $('input[name="img"]')[0].files
    for(let i = 0; i < img.length; i++){
        formData.append('image',img[i])
    }

    console.log(img[0])
    //console.log(data)

    $.ajax({
        method: "POST",
        url: "https://quizzapi.xyz/api/questions",
        processData: false,
        contentType: false,
        data: formData,
        dataType: 'json',
        enctype: 'multipart/form-data',
        success:function(response){
             console.log(response) 
             document.getElementById('form_questions').reset()
        },
        error:function(){

        },

    })


}