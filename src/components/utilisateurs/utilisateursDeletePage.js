import axios from 'axios';

const UtilisateursDeletePage = ({api_url}) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const config = {
        headers: {
            'username': process.env.REACT_APP_API_USERNAME,
            'key_pass': process.env.REACT_APP_API_KEY_PASS
        }
    };

    axios.delete(api_url + `/utilisateurs/${id}`, config)
        .then(response => {
            window.location.href = '/utilisateurs';
        })
        .catch(error => {
            console.log(error);
            alert(error.response.data.message);
        });
};

export default UtilisateursDeletePage;
