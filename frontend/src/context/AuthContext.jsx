import  {  createContext, useContext, useState } from 'react'
 const userContext = createContext()
function AuthContext({children}) {

     const [user, setuser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

    const login = (user) =>{
      setuser(user)
       localStorage.setItem('user', JSON.stringify(user));
    }
    const logout = ()=>{
      setuser(null)
      localStorage.removeItem('user')
    }
  return (
    <userContext.Provider value={{user,login, logout}}>
        {children}
    </userContext.Provider>
  )
}
export const useAuth = ()=>useContext(userContext)
export default AuthContext
