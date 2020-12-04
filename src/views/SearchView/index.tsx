import React, { useEffect, useState, Component } from 'react';
import * as API from '../../api';
import { ISummary  } from '../../api/interfaces';
import { Search } from '../../api';
import { Card, SubNavbar, Pagination} from '../../components';
import moment from 'moment';
import {Link} from 'react-router-dom';
import './scss/SearchView.scss';

const SearchView = () => {
    
    const [ post, setPost ] = useState<any[]>([]);
    const [ keyword,setKeyword] = useState('');
    const [page, setPage] = useState(1);
	const [total, setTotal] = useState(1);
    

    const fn = async() => {
        const responce = await API.Search.fetchArticles(keyword) as any;
        setPost(responce.items);
    }

    useEffect(() => {
        fn();
    }, []);

    const Search = {
        search: () => {
            if ( keyword === "" ) {
                alert("검색어를 입력해주세요");
                return;
            }
            else {
                fn();
            }
        }
    }

    return(
        <>
        <div className = "search-container">
                <div className = "search-bar-wrap">
                    <div className = "saerch-input-bar">
                        <input className = "search-input"  
                        placeholder="검색어를 입력하시오" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}/> 
                        <button className = "search-button" onClick={fn}><img className= "search-but-img" src="https://i.pinimg.com/originals/e7/d4/50/e7d450d8c31ae10aa663d082fdbb3db9.png"></img></button>
                    </div>
                <div className = "__search-navbar_wrap">
                    <SubNavbar className="__search-navbar" links={
                        [
                        { to: '/search', text:''},
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
                        post.map((item) => {
                            return (
                                <Link className ="__user-link"   to={`/summary/${item._id}`}>
                                
                                    <div className="search-card" >
                                        <Card>
                                            <div className = "content-wrap">
                                            <p className="news-title">{item.title}</p>
                                            <p className="news-content">{item.description}</p>
                                            <p className="news-time">{moment(item.pubDate).format('yyyy dddd, hh:mm')}</p>
                                            </div>
                                        </Card>
                                    </div>
                                
                               </Link>
                            )
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

export default SearchView;