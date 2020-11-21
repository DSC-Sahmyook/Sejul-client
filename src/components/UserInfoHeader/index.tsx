import React, { useEffect, useState } from 'react';
import * as API from '../../api';
import { useHistory, useParams } from 'react-router-dom';
import { IUser } from '../../api/interfaces';
import {CircularImage, SubNavbar} from '../../components';
import './UserInfoHeader.scss';

interface IUserInfoHeaderParams {
    username: string;
    user?: IUser | undefined | null;
}

const UserInfoHeader = () => {
    const params = useParams();
    const history = useHistory();
    const [user, setUser] = useState<IUser | undefined>(undefined);

    const fetch = async () => {
        // 404
        try {
            const currentParams = params as IUserInfoHeaderParams;
            const result = await API.User.fetch(currentParams.username);
            setUser(result);
        }
        catch (e) {
            if (e.response !== undefined && e.response.status === 404) {
                // 404 (NOT FOUND)면 뭐해라
                alert("사용자 정보가 없다");
                history.push("/");
            }
            else {
                // 그냥 서버에러 
                alert("일시적인 오류가 발생했다.\n잠시 후 실행해달라 ");
                history.push("/");
            }
        }
    }

    useEffect(() => {
        fetch();
    }, []);
    return (
        <>
        <div className="info-header-container">
			<div className="info-header-content">
				<CircularImage className="info-header-profile" url={user?.profile}/>

				<div className="info-header-text">
					<div className="info-header-name">{user?.username}</div>
					<div className="info-header-small">
						<p>팔로우 {user?.following.length} </p>
						<p>작성글 {user?.articles.length} </p>
					</div>
				</div>
			</div>
		</div>
        <SubNavbar className="__user-navbar" links={
            [ 
              { to: `/user/${user?.username}/summary`, text: '작성한 글' },
              { to: `/user/${user?.username}/following`, text: '팔로잉' },
              { to: `/user/${user?.username}/hashtag`, text: '해시태그' },
              { to: `/user/${user?.username}/like`, text: '좋아요한 글' },
              { to: `/user/${user?.username}/scrap`, text: '담은 기사' }
            ]
          } />
          </>
    )
}

export default UserInfoHeader;