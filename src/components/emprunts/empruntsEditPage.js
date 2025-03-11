import axios from 'axios';

const EmpruntsEditPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const config = {
        headers: {
            'username': process.env.REACT_APP_API_USERNAME,
            'key_pass': process.env.REACT_APP_API_KEY_PASS
        }
    };

    axios.put(`http://127.0.0.1:3001/api/v1/emprunts/${id}`, null, config)
        .then(response => {
            window.location.href = '/emprunts';
        })
        .catch(error => {
            alert(error.response.data.message);
        });
};

export default EmpruntsEditPage;
