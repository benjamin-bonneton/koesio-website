import axios from 'axios';

const LivresDeletePage = ({api_url}) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const config = {
        headers: {
            'username': localStorage.getItem('username'),
            'key_pass': localStorage.getItem('key_pass')
        }
    };

    axios.delete(api_url + `/livres/${id}`, config)
        .then(response => {
            window.location.href = '/livres';
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.message);
        });
};

export default LivresDeletePage;
