import React, { useEffect,useState } from 'react'
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { useLocationSearch } from '../../lib/hooks';
import * as API from '../../api'
import { ISummary,IHashtag} from '../../api/interfaces';
import { Card, SubNavbar, Pagination, CircularImage} from '../../components';
import './scss/SearchSummaryView.scss'
import { FcSearch } from 'react-icons/fc';
import {ImCancelCircle} from 'react-icons/im';
import moment from 'moment'
import 'moment/locale/ko';
import {Link} from 'react-router-dom';


const SearchSummaryView = () => {
    const history = useHistory();
    const matches = useRouteMatch();
    const loc = useLocation();
    const searches = useLocationSearch(loc.search);
    
    const [posts, setPosts ] = useState([] as ISummary[]);
    const [keyword,setKeyword] = useState('');
    const [bool,setBool] = useState(true);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [cnt, setCnt] = useState(6);

    
    
    const fn = async () => {
                const responce = await API.Search.fetchSummaries(keyword, page,cnt);
                setPosts(responce.data);
                setCnt(responce.cnt);
    }

    useEffect(() => {
        fn();
    }, []);


    return(
        <>
        <div className = "summary-search-container">
                <div className = "search-bar-wrap">
                    <div className = "saerch-input-bar">
                        <input className = "search-input"  
                        placeholder="검색어를 입력하시오" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}/> {
                            bool ? 
                        (<button className = "search-button" onClick={()=> {fn(); setBool(false); }}><FcSearch className="search-but-img"/></button>) : 
                        (<button className = "search-button" onClick={()=> {setKeyword(""); setBool(true); setPosts([]);}}><ImCancelCircle className="search-but-img"/></button>)
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
                    {
                        posts.map((item,idx) => {
                            return (
                                
                                <div key={idx} className="search-card">
                                    <Link className ="__user-link"   to={`/summary/${item._id}`}>
                                    <Card>
                                        <div className="user-information-wrap">
                                       <div className="user-img-wrap">
                                           <CircularImage className="main-slider-author-profile" url={item.user.profile}/></div>
                                            <p className="user-name">{item.user.username} </p>
                                        </div>

                                            <p className="news-title">{item.article.title}</p>

                                        <div className="search-Hashtag">
                                            <div className="serch-Hashtag-text-wrap">
                                            {item.hashtags.length > 0 ? (
                                                
                                                item.hashtags.map(( hashtag ) => (
                                                    <p  className="hashtags-text">#{hashtag.text}</p>
                                                ))):(
                                                    <p className="hashtags-case-2">등록된 해시태그가 없습니다</p>
                                                )
                                                }
                                            </div>

                                        </div>
                                        <div className="new-time-wrap">
                                            <p className="new-write-time">{item.timestamp}소요</p>
                                            <p className="news-create-time">{moment(item.createdAt).fromNow()}</p>
                                        </div>
                                    </Card> 
                                </Link>
                                </div>
                               
                            );
                        })
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

export default SearchSummaryView;


