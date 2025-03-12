import axios from 'axios';

const EmpruntsEditPage = ({api_url}) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const config = {
        headers: {
            'username': localStorage.getItem('username'),
            'key_pass': localStorage.getItem('key_pass')
        }
    };

    axios.put(api_url + `/emprunts/${id}`, null, config)
        .then(response => {
            window.location.href = '/emprunts';
        })
        .catch(error => {
            alert(error.response.data.message);
        });
};

export default EmpruntsEditPage;
