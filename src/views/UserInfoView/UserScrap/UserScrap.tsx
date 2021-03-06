import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, Link, useLocation } from 'react-router-dom';
import { CircularImage, Card, Pagination } from '../../../components';
import { IArticle, ISummary, IUser } from '../../../api/interfaces';
import * as API from '../../../api';
import './UserScrap.scss';
import UserFollowingPosts from '../UserFollowing/UserFollowingPosts';

interface IUserInfoHeaderParams {
	username: string;
	user?: IUser | undefined | null;
}
const UserScrap = () => {
	const history = useHistory();
	const matches = useRouteMatch();
	const [news, setNews] = useState<IArticle[] | undefined>();

	const fetch = {
		news: async (username: string | undefined) => {
			if (username === undefined) {
				// 404
				alert('유저 정보가 올바르지 않습니다');
				history.push('/');
			} else {
				try {
					const result = await API.User.fetchScrap(username);
					setNews(result);
				} catch (e) {
					console.log(e);
				}
			}
		},
	};
	useEffect(() => {
		const params = matches.params as IUserInfoHeaderParams;
		fetch.news(params.username);
	}, []);

	return (
		<>
			<div className="userInfo-contents-container">
				<div className="userInfo-user-following">
					<p className="userInfo-user-following header">스크랩한 기사</p>
					<div className="user-scrap-container">
						{news?.map((news: IArticle, index: number) => (
							<Link key={index} className="__user-link" to={`/summary?title=${news.title}&link=${news.originalLink}`}>
								<Card key={index} className="Scrap-news-card">
									<div className="Scrap-news-card-title">
										<p>{news.title}</p>
									</div>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default UserScrap;
