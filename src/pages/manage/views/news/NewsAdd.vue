<template>
  <div class="Main">
    <div class="Title">
      <p>添加新闻</p>
    </div>
    <el-divider></el-divider>

    <div class="Content">
      <el-form ref="form" :model="this.form"  label-width="80px" >
        <el-form-item class="ContentTitle" >
          <el-input v-model="this.form.title" style="width: 300px;" placeholder="请输入文章题目"></el-input>
        </el-form-item>
        <el-form-item class="Buttons">
          <el-switch
              v-model='this.form.importance'
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="2"
              style="padding-left: 550px"
          > </el-switch>开启置顶
          <el-switch
              v-model='this.form.defunct'
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="Y"
              inactive-value="N"
              style="padding-left: 170px"
          > </el-switch>开启屏蔽
        </el-form-item>

        <el-form-item class="ContentMain">
          <el-input v-model="form.content"  placeholder="请输入文章内容" type="textarea" :rows="25"></el-input>
        </el-form-item>
      </el-form>



      <div class="Button">

        <el-button type="primary" @click="handleAddNews(this.form)">提交</el-button>
      </div>
    </div>
  </div>
</template>


<script>

import api from "@/util/api.js";

export default {
  name: 'ProblemAdd',
  data() {
    return {
      form: {
        title: '讨论一下如何做好眼前的事情',
        content: '　范仲淹说过，不为良相，便为良医。这与医圣张仲景《伤寒杂病论》中说的"进则救世，退则救民"如出一辙，契合儒家"济世利天下"的人生最高境界。然，"相"非人人可期，"医"却大可实现。无独有偶，鲁迅济世救民之心与范张二人极为相似，立志报国的他目睹国人深受鸦片毒害而体格孱弱时，便漂洋过海去日本学医。\n' +
            '　但看到国人被日本人杀害，而国人却充当"看客"围观"鉴赏壮举"后，他醒悟了"凡是愚弱的国民，即使体格如何健全、茁壮，也只能做毫无意义的示众的材料和看客"。鲁迅决定弃医从文，他要用辛辣锋利的笔触唤醒沉睡而麻木的国人。他认为革命的第一要著是改变他们的精神，他于1919年5月在《新青年》上发表了短篇经典《药》。\n' +
            ' 《药》通过对“茶馆主人华老栓夫妇为儿子小栓买人血馒头治病”的故事，揭示了引人深思的三味药：一是长期的封建统治给国民造成的愚昧麻木所引发的"人血馒头"这一"假药"；二是鲁迅开给麻木不仁民众的"拯救他们灵魂和精神的良药"；三是鲁迅提醒辛亥革命者"不能脱离群众基础的良药"。\n' +
            ' 《药》巧妙地设置了明暗两条线，明线是华家华老栓夫妇为儿子买药治病，暗线是夏家革命者夏瑜被军阀杀害而英勇就义，双线并行又交织，结构相当精巧，构思新颖奇特。《药》文学艺术上乘、匠心独运，文中的三味"药"更是贯穿小说明暗两线，让人拍案称绝。\n' +
            '　华老栓、华大妈和华小栓一家\n' +
            '　贰:深刻解读文中蕴含的"三味药"，折射了旧时国民的“病态”，辨明疗救旧中国、拯救民族魂的“良药” 一、第一味药：在华老栓们麻木不仁的意识里，治疗小栓肺痨病的“药”是荒诞不经的"人血馒头"，让人触目惊心、可悲可叹\n' +
            '　心理学家弗洛伊德认为：人的不同意识层次包括意识、前意识和潜意识，这三者从深层支配着人的整个心理和行为，成为人一切动机的源泉。而代表人类更深层、更根本和更原始的心理能量是潜意识，潜意识是人类一切行为的内驱力。\n' +
            '　不难理解，华老栓们的潜意识便是他们外在行为的内驱力，而这种内驱力受封建统治和封建迷信的支配，因此，封建思想这种潜意识根深蒂固的控制并支配了他们的行为。他们愚昧的认为人血馒头能够治好小栓肺痨病。于是，华老栓倾其毕生积蓄去为爱子买药。\n' +
            '　这是极具讽刺意味的药方，看过《药》的人们，会被猝不及防的震撼到。我们知道，任何病症都应该是对症下药、有的放矢的，或者针对病症的具体特征，采取有效的措施，而不是靠愚昧的封建迷信意识，以致最终造成不可挽回的局面。从结果来看，小栓并未因服了此药而疗愈，反而不治而亡被埋进了坟墓。\n' +
            '　华老栓们认为"包好"的"药"自然毫无疗效，更谈不上对症下药了，也就推翻了"人血馒头能治痨病"这一荒诞不经的说法。从整条明线来看，各环节极具讽刺意味。如果华老栓们能让小栓得到科学合理的治疗，那结果就皆大欢喜啦。\n' +
            '　其实，旧时称谓的“肺痨”就是现在的“肺结核”，肺痨在旧时比较可怕，却并非不能治疗。如果肺部病灶不多，加之年轻人体魄强健和科学治疗，痊愈是完全有可能的。但在华老栓们狭隘、麻木的意识里，要么迷信天方夜谭的“人血馒头”药，要么就心存等死一念，全无积极治疗一途。\n' +
            '　因此，华老栓们潜意识里的这一味药，并非真的良药，反倒耽搁了科学治疗期，成了催化剂或催命符，误了华小栓年轻蓬勃的性命，可悲可叹。',
        defunct: 'N',
        // importance,2表示是普通级别，1表示是置顶
        importance: 2,
      },
    }
  },

  methods: {
    handleAddNews(data){
      api.addNews(data).then( res => {
        alert("add news success");
      }).catch(err => {
        alert("add news fail")
      })
    },
  }
}
</script>

<style>

.ContentTitle {
  text-align: center;
}
.ContentMain {
}

.Button {
  text-align: right;
}


</style>
