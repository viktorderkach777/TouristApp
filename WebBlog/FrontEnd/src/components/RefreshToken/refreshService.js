    
import BaseService from '../../Services/Base/BaseService';

export default class RefreshService {
    
    static RefreshToken = async () => {
        const token = localStorage.getItem('refreshToken')
        var tokens = await BaseService.PostResourse(`account/refresh/${token}`)
        return BaseService.SetTokensGetUser(tokens)
    }
}