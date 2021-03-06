import axios from 'axios';
import { IAPIResponse, IHashtag, ISummary, IUser, IArticle } from './interfaces';
import { getUrl } from './tools/host';
import * as LIB from '../lib';

export interface IUserFetchResponse {
	user: IUser;
	summaries: ISummary[];
}

export const fetch = async (username: string): Promise<IUserFetchResponse> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}`),
	});
	return result.data;
};

/**
 * @description 사용자가 작성한 글 가져오기
 * @param username 사용자 이름
 */
export const fetchUserSummary = async (username: string, page: Number = 1, cnt: Number = 6): Promise<ISummary[]> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}/summaries`),
		params: {
			page: page,
			cnt: cnt,
		},
	});
	return result.data;
};

export interface IFetchFollowingUserResponse {
	summary: {
		currentPage: Number;
		data: ISummary[];
		total: Number;
	};
	users: IUser[];
}

/**
 * @description 사용자가 팔로우한 사용자들과 해당 사용자들이 작성한 글 가져오기
 * @param username 사용자 이름
 */
export const fetchFollowingUser = async (
	username: string,
	page: Number = 1,
	cnt: Number = 6
): Promise<IFetchFollowingUserResponse> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}/following`),
		params: {
			page: page,
			cnt: cnt,
		},
	});
	return result.data;
};

export interface IFetchFollowingHashtagResponse {
	hashtags: IHashtag[];
	summaries: ISummary[];
}

/**
 * @description 사용자가 팔로우한 해시태그와 해당 해시태그에 작성된 글 가져오기
 * @param username 사용자 이름
 */
export const fetchFollowingHashtag = async (
	username: string,
	page: Number = 1,
	cnt: Number = 6
): Promise<IFetchFollowingHashtagResponse> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}/hashtags`),
		params: {
			page: page,
			cnt: cnt,
		},
	});
	return result.data;
};

/**
 * @description 사용자가 좋아요한 글 가져오기
 * @param username 사용자 이름
 */

interface IfetchLikeSummaryResponse {
	page: number;
	data: ISummary[];
	count: number;
}

export const fetchLikeSummary = async (
	username: string,
	page: Number = 1,
	cnt: Number = 6
): Promise<IfetchLikeSummaryResponse> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}/likes`),
		params: {
			page: page,
			cnt: cnt,
		},
	});
	return result.data;
};

export const fetchScrap = async (username: string, page: Number = 1, cnt: Number = 5): Promise<IArticle[]> => {
	const result = await axios({
		method: 'GET',
		url: getUrl(`api/user/${username}/bookmarks`),
		params: {
			page: page,
			cnt: cnt,
		},
	});
	return result.data;
};

export const followUser = async (username: string) => {
	const token = LIB.Token.get();

	const result = await axios({
		method: 'POST',
		url: getUrl(`api/user/following/${username}`),
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return result.data;
};

export const unfollowUser = async (username: string) => {
	const token = LIB.Token.get();
	const result = await axios({
		method: 'DELETE',
		url: getUrl(`api/user/following/${username}`),
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return result.data;
};

export const likeSummary = async (summary_id: string) => {
	const token = LIB.Token.get();

	const result = await axios({
		method: 'POST',
		url: getUrl(`api/user/summary/${summary_id}/like`),
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return result.data;
};

export const unlikeSummary = async (summary_id: string) => {
	const token = LIB.Token.get();

	const result = await axios({
		method: 'DELETE',
		url: getUrl(`api/user/summary/${summary_id}/like`),
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return result.data;
};
//프로필 변경
export const fetchProfile = async (data:any)=> {
	const token = LIB.Token.get();
	const response = await axios({
		method: 'POST',
		url: getUrl('api/user/profile'),
		data: data,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response.data;
};
