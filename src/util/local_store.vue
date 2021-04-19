
<script>
export default {
  // 在sessionStorage设置值
    setContextDataInSessionStorage: function (key, value) {
      if (typeof value == "string") {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
      return;
    },
// 从sessionStorage取值
    getContextDataSessionStorage: function (key) {
      const str = localStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (e) {
          return str;
        }
      }
      return;
    }

}

</script>
