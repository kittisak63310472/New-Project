<template>
  <div  class = "push_right">

    <h1> Add Company </h1>
    <form v-on:submit.prevent="createBlog">
      <p>Name: <input type="text" v-model="blog.title" /></p>
      <transition name="fade">
		    <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
			    <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
		    </div>
	    </transition>
      <p>Detail: <input type="text" v-model="blog.category" /></p>
      <p><strong> Select Image :</strong></p>

      <form enctype="multipart/form-data" novalidate>
        <div class="dropbox">
          <input
            type="file"
            multiple
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="
              filesChange($event.target.name, $event.target.files);
              fileCount = $event.target.files.length;
            "
            accept="image/*"
            class="input-file"
          />
          <!-- <p v-if="isInitial || isSuccess"> -->
          <h2> <p v-if="isInitial">Select file</p> </h2>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
          <p v-if="isSuccess">...Successfully executed...</p>
          <p v-if="isFailed">...Failed...</p>
        </div>
        <div>
          <ul class="pictures">
            <li v-for="picture in pictures" v-bind:key="picture.id">
              <img
                style="margin-bottom: 5px"
                :src="BASE_URL + picture.name"
                alt="picture image"
              />
              <button v-on:click.prevent="delFile(picture)">Delete Image</button>
			        <button v-on:click.prevent="useThumbnail(picture.name)">Reduce image size</button>
             <div class="highlight"><h5><p>**Click on the picture and drag it down to the bottom box.**</p></h5></div>
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
      </form>
      <p>
        <vue-ckeditor
          v-model.lazy="blog.content"
          :config="config"
          @blur="onBlur($event)"
          @focus="onFocus($event)"
        />
      </p>
      <p><button type="submit">OK</button>
      <button v-on:click="navigateTo('/comments')"> BACK </button></p>
    </form>
  </div>
</template>

<script>
import BlogsService from "@/services/BlogsService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from "@/services/UploadService";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
      error: null,
      // uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "userPhoto",
      uploadedFileNames: [],
      pictures: [],
      pictureIndex: 0,

      blog: {
        title: "",
        thumbnail: "null",
        pictures: "null",
        content: "",
        category: "",
        comment: "",
        status: "",
      },

      config: {
        toolbar: [
          {
            name: "document",
            items: [
              "Source",
              "-",
              "Save",
              "NewPage",
              "Preview",
              "Print",
              "-",
              "Templates",
            ],
          },

          {
            name: "clipboard",
            items: [
              "Cut",
              "Copy",
              "Paste",
              "PasteText",
              "PasteFromWord",
              "-",
              "Undo",
              "Redo",
            ],
          },

          {
            name: "editing",
            items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"],
          },

          {
            name: "forms",
            items: [
              "Form",
              "Checkbox",
              "Radio",
              "TextField",
              "Textarea",
              "Select",
              "Button",
              "ImageButton",
              "HiddenField",
            ],
          },
          "/",

          {
            name: "basicstyles",
            items: [
              "Bold",
              "Italic",
              "Underline",
              "Strike",
              "Subscript",
              "Superscript",
              "-",
              "CopyFormatting",
              "RemoveFormat",
            ],
          },

          {
            name: "paragraph",
            items: [
              "NumberedList",
              "BulletedList",
              "-",
              "Outdent",
              "Indent",
              "-",
              "Blockquote",
              "CreateDiv",
              "-",
              "JustifyLeft",
              "JustifyCenter",
              "JustifyRight",
              "JustifyBlock",
              "-",
              "BidiLtr",
              "BidiRtl",
              "Language",
            ],
          },
          { name: "links", items: ["Link", "Unlink", "Anchor"] },

          {
            name: "insert",
            items: [
              "Image",
              "Flash",
              "Table",
              "HorizontalRule",
              "Smiley",
              "SpecialChar",
              "PageBreak",
              "Iframe",
              "InsertPre",
            ],
          },
          "/",
          
          { name: "styles", items: ["Styles", "Format", "Font", "FontSize"] },
          { name: "colors", items: ["TextColor", "BGColor"] },
          { name: "tools", items: ["Maximize", "ShowBlocks"] },
          { name: "about", items: ["About"] },
        ],
        height: 300,
      },
    };
  },

  methods: {
    async createBlog() {
      try {
        this.blog.pictures = JSON.stringify(this.pictures);
        await BlogsService.post(this.blog);
        this.$router.push({
          name: "blogs",
        });
      }catch (err) {
        console.log(err);
      }
    },

    navigateTo(route) {
      console.log(route);
      this.$router.push(route);
    },

    wait(ms) {
      return (x) => {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
      };
    },

    reset() {
      this.currentStatus = STATUS_INITIAL;
      // this.uploadedFiles = []
      this.uploadError = null;
      this.uploadedFileNames = [];
    },

    async save(formData) {
      try {
        this.currentStatus = STATUS_SAVING;
        await UploadService.upload(formData);
        this.currentStatus = STATUS_SUCCESS;

        let pictureJSON = [];
        this.uploadedFileNames.forEach((uploadFilename) => {
          let found = false;
          for (let i = 0; i < this.pictures.length; i++) {
            if (this.pictures[i].name == uploadFilename) {
              found = true;
              break;
            }
          }
          if (!found) {
            this.pictureIndex++;
            let pictureJSON = {
              id: this.pictureIndex,
              name: uploadFilename,
            };
            this.pictures.push(pictureJSON);
          }
        });
        this.clearUploadResult();
      }catch (error) {
        console.log(error);
        this.currentStatus = STATUS_FAILED;
      }
    },

    filesChange(fieldName, fileList) {
      const formData = new FormData();
      if (!fileList.length) return;
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name);
        this.uploadedFileNames.push(fileList[x].name);
      });
      this.save(formData);
    },

    clearUploadResult: function () {
      setTimeout(() => this.reset(), 5000);
    },

    async delFile(material) {
      let result = confirm("Want to delete?");
      if (result) {
        let dataJSON = {
          filename: material.name,
        };
        await UploadService.delete(dataJSON);
        for (var i = 0; i < this.pictures.length; i++) {
          if (this.pictures[i].id === material.id) {
            this.pictures.splice(i, 1);
            this.materialIndex--;
            break;
          }
        }
      }
    },

	  useThumbnail(filename){
		  console.log(filename)
		  this.blog.thumbnail = filename
	  }

  },
  created() {
    this.reset();
  },

  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    },
  },

  components: {
    VueCkeditor,
  },
  
};
</script>

<style scoped>
.dropbox {
  outline: 2px dashed grey;
  outline-offset: -10px;
  background: lemonchiffon;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; 
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; 
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: khaki; 
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
ul.pictures {
  list-style: none;
  padding: 0;
  margin: 0;
  float: left;
  padding-top: 10px;
  padding-bottom: 10px;
}
ul.pictures li {
  float: left;
}
ul.pictures li img {
  max-width: 180px;
  margin-right: 20px;
}
.clearfix {
  clear: both;
}
.thumbnail-pic img{
	width:200px
}
.highlight{
  color: rgb(239, 116, 116);
}
.push_right{
    margin-top: -270px;
    margin-left: 470px;
}
.nv-navbar {
  background-color: #DCDCDC;
  width: 100%;
  padding: 10px 0px 10px 0px;
}
.nv-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}
.nv-navbar .nav li {
  float: left;
}
.nv-navbar .nav li a {
  padding: 10px;
  text-decoration: none;
  color: #778890;
  font-weight: bold;
}
.nv-navbar .nav li a:hover {
  padding: 10px;
  text-decoration: none;
  color: black;
}
.nv-navbar .nav li a.router-link-active {
  background-color: #708090;
  color: black;
}
.clearfix {
  clear: left;
}
</style>
