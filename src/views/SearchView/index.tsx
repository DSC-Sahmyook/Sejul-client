import React, { useEffect, useState, Component } from 'react';
import { useRouteMatch, useHistory, useLocation, Redirect } from 'react-router-dom';
import { useLocationSearch } from '../../lib/hooks';
import * as API from '../../api';
import { ISummary  } from '../../api/interfaces';
import { Search } from '../../api';
import { Card, SubNavbar, Pagination} from '../../components';
import moment from 'moment';
import {Link} from 'react-router-dom';
import { FcSearch } from 'react-icons/fc';
import { ImCancelCircle } from 'react-icons/im'
import './scss/SearchView.scss';
import { pageview } from 'react-ga';

export interface ISearchNews {
    title : string;
    description : string;
    pubDate : string;
    link: string | String; // 기사 네이버 링크
    originalLink: string | String; // 언론사 링크
}




const SearchView = () => {
    const [bool,setBool] = useState(true); 
    const history = useHistory();

    const [topics, setTopics] = useState([] as ISearchNews[]);
    const [keyword,setKeyword] = useState('');
    
    
    const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);
    const [cnt, setCnt] = useState(6);
    
    const matches = useRouteMatch();
    const loc = useLocation();
    const searches = useLocationSearch(loc.search);

    

    const Fn = async () => {
                const responce = await API.Search.fetchArticles(keyword,page,cnt);
                setTopics(responce.items);
                setTotal(responce.items.total as number);
    }
// 1. 페이지가 처음 로드
    useEffect(() => {
        if (searches.length > 1) {
			setPage(1);
		}
		else {
			const __page = searches.find(item => item.key === "page");
			if (__page) {
				setPage(Number(__page.value));
			}
		}
    }, []);
//2. 검색 : 처음은 첫번째 페이지에 고정
    useEffect(()=> {

        if (keyword === "" ) {
            alert('검색어를 입력해주세요');
            history.push('/search/topic');
            return;
        }

    },[]);


// 3. 페이지 번호가 바뀔때마다 실행
        useEffect(()=> {
            Fn();

        },[page]);

    return(
        <>
        <div className = "search-container">
                <div className = "search-bar-wrap">
                    <div className = "saerch-input-bar">
                        <input className = "search-input"  
                        placeholder="검색어를 입력하시오" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}/> {
                            bool ? 
                        (<button className = "search-button" onClick={()=> {Fn(); setBool(false); }}><FcSearch className="search-but-img"/></button>) : 
                        (<button className = "search-button" onClick={()=> {setKeyword(""); setBool(true); setTopics([]); }}><ImCancelCircle className="search-but-img"/></button>)
                        }
                        </div>
                <div className = "__search-navbar_wrap">
                    
                    <SubNavbar className="__search-navbar" links={
                        [   
                        { to: '/search/topic/', text: '기사 검색' },
                        { to: '/search/summary/', text: '글 검색' }
                        ]
                    } 
                        />
                </div>
            </div>
            <div className = "search-content-container">
                <div className = "search-content-container-wrap">
                     {topics.length === 0 ? ( <p className = "first-content">검색결과가 없습니다.</p>) : (
                
                        topics.map((item,idx) => {
                            return (
                                <Link className ="__user-link"   to={`/summary?title=${item.title}&link=${item.link}`}>
                                
                                    <div key={idx} className="search-card" >
                                        <Card>
                                            <div className = "content-wrap">
                                            <p className="news-title" dangerouslySetInnerHTML={{ __html: item.title }}></p>
                                            <p className="news-content" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                            <p className="news-time">{moment(item.pubDate).format('yyyy dddd, hh:mm')}</p>
                                            </div>
                                        </Card>
                                    </div>
                                
                               </Link>
                            )
                        })
                    )
                }


                </div>
            </div>
            <div className = "search-pagination-wrap">
                <Pagination page={page}  total = {total} itemsPerPage={6}/>
            </div>
        </div>
        </>
    )
}

export default SearchView;