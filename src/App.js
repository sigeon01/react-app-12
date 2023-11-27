// React 라이브러리와 Component 클래스를 import합니다.
import React, { Component } from "react";

// 다른 컴포넌트들을 import합니다.
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";


// 이미지 파일들을 import합니다.
import webImg from "./img/web.png";
import htmlImg from "./img/html.png";
import cssImg from "./img/css.png";
import jsImg from "./img/javascript.png";
import reactImg from "./img/react.png";

// App 클래스를 정의합니다. Component를 상속받습니다.
class App extends Component {
  // constructor를 통해 컴포넌트의 초기 상태를 설정합니다.
  constructor(props) {
    super(props); // Component 클래스의 생성자를 호출합니다.
    this.max_content_id = 4;
    this.state = {
      mode: "welcome", // 현재 모드를 'welcome'으로 설정합니다.
      selected_content_id: 0, // 선택된 content의 id를 0으로 초기화합니다.
      subject: { title: "WEB", sub: "World Wide Web!" }, // 상단 제목에 대한 정보를 객체로 설정합니다.
      welcome: { title: "Welcome", desc: "Hello, React!!", image: webImg }, // 환영 메시지와 이미지를 객체로 설정합니다.
      contents: [
        // 컨텐츠의 배열을 설정합니다. 각 항목은 id, title, desc, image 속성을 갖습니다.
        {
          id: 1,
          title: "HTML",
          desc: "HTML is for information",
          image: htmlImg,
        },
        { id: 2, title: "CSS", desc: "CSS is for design", image: cssImg },
        {
          id: 3,
          title: "JavaScript",
          desc: "JS is for interactive",
          image: jsImg,
        },
        { id: 4, title: "React", desc: "React is for UI", image: reactImg },
      ],
    };
  }
  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }
  getContent() {
    var _title,
      _desc,
      _image,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _image = this.state.welcome.image;
      _article = (
        <ReadContent title={_title} desc={_desc} img={_image}></ReadContent>
      );
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = (
        <ReadContent
          title={_content.title}
          desc={_content.desc}
          img={_content.image}
        ></ReadContent>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
              image: "",
            });
            this.setState({ contents: _contents });
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      var _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            this.setState({ contents: _contents, mode: "read" });
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }

  // render 함수는 컴포넌트가 화면에 렌더링될 때 호출됩니다.
  render() {
    var _title,
      _desc,
      _image,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _image = this.state.welcome.image;
      _article = (
        <ReadContent title={_title} desc={_desc} img={_image}></ReadContent>
      );
    } else if (this.state.mode === "read") {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          _image = data.image;
          break;
        }
        i = i + 1;
      }
      _article = (
        <ReadContent title={_title} desc={_desc} img={_image}></ReadContent>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
              image: "",
            });
            this.setState({ contents: _contents });
          }.bind(this)}
        ></CreateContent>
      );

    }

    console.log(this.state.mode);
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
        ></Subject>
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id),
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm("really?")) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({ mode: "welcome", contents: _contents });
                alert("deleted!");
              }
            } else {
              this.setState({ mode: _mode });
            }
          }.bind(this)}
        ></Control>

        {this.getContent()}
      </div>
    );
  }
}

export default App;
