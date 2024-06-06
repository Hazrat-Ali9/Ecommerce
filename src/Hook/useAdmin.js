import { useEffect, useState } from "react"
const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect( () =>{
        // email verification
        const email = user?.email;
        if(email){
            fetch(`http://localhost:8000/admin/${email}`, {
                method:'GET',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res=>res.json())
            .then(data => {
                setAdmin(data.admin);
                setAdminLoading(false);
            })
        }
    }, [user])
// user admin 
    return [admin, adminLoading]
}

export default useAdmin;

// Use Admin