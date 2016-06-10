<?php

/**
 * @file
 * Template to display a view as a table.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $header: An array of header labels keyed by field id.
 * - $caption: The caption for this table. May be empty.
 * - $header_classes: An array of header classes keyed by field id.
 * - $fields: An array of CSS IDs to use for each field id.
 * - $classes: A class or classes to apply to the table, based on settings.
 * - $row_classes: An array of classes to apply to each row, indexed by row
 *   number. This matches the index in $rows.
 * - $rows: An array of row items. Each row is an array of content.
 *   $rows are keyed by row number, fields within rows are keyed by field ID.
 * - $field_classes: An array of classes to apply to each field, indexed by
 *   field id, then row number. This matches the index in $rows.
 * @ingroup views_templates
 */

/*
 * local utility functions
 * should be moved to a custom module, but left here for coding readability and portability
 */
function _get_missed_session($username, $bypassed, $attended, $cancelled){
 if($bypassed) return $bypassed;
 if($username && !$attended && !$cancelled) return 'Missed';
 return '';
}
function _display_total($v, $k){
		print $k.': <b>'.$v.'</b><br />';
}
function _display_attendance_vs_total($v, $k){
		print $k.': <b>'.$v['attend'].'/'.$v['total'].'</b><br />';
}
function _get_topic($rid){
	if($rid) {
		$re = entity_load('node_registration', array($rid));
		$ret = field_view_field('node_registration', $re[$rid], 'field_topics', array('type'=>'ds_taxonomy_separator', 'label'=>'hidden'));
		return strip_tags(render($ret));
	}else{
		return '';
	}
}
function _update_topics($v, $k){
	global $topics;
	if(array_key_exists($v, $topics)) $topics[$v]++; else $topics[$v] = 1;
	//dsm($topics);
	return $topics;
}

// temporary variables and arrays
// for sorting and displaying total columns
$nid;
$nodeCount;
$userCount;
$attendanceCount;
$cancelCount;
$confirmedCount;
$totalFeedback;
$missedCount;
$rowsSorted = array();
$availableCount = array('O' => 0, 'X' => '0');
$dates = array();
$times = array();
$trainers = array();
$topic;
$topics = array();

foreach($rows as $rowCount => &$pRow){
	$nid = strip_tags($pRow['nid']);
	// sort topic totals
	$topic = _get_topic($pRow['registration_id']);
	$atop = array_map('trim', explode(',', $topic));
	if(!empty($atop[0])) $topics = end(array_map('_update_topics', $atop));

	// Reset each row CSS classes passed by Views module
	$row_classes[$nid] = $row_classes[$rowCount]; unset($row_classes[$rowCount]);

	$isAttended = $pRow['attended'] ? 1 : 0;
	$attendanceCount = $attendanceCount + $isAttended;

	$cancelCount = $cancelCount + ($pRow['cancelled'] ? 1 : 0);

	$confirmedCount = $confirmedCount + ($pRow['confirmed'] ? 1 : 0);

	$missedInfo = _get_missed_session($pRow['user_email'], $pRow['bypassed'], $pRow['attended'],$pRow['cancelled']);
	$missedCount = $missedCount + ($missedInfo ? 1 : 0);

	$userCount = $userCount + ($pRow['user_email'] ? 1 : 0);

	// adding attendance to each day total
	$sDate = strip_tags($pRow['field_date_1']);
	$aDate = explode(' ', $sDate)[0];
	$dates[$aDate]['attend'] += $isAttended;

	// adding attendance to each time total
	$sTime = strip_tags($pRow['field_date']);
	$aTime = str_replace(':00', '', $sTime);
	$times[$aTime]['attend'] += $isAttended;

	// adding attendance to each trainer total
	$sTrainer = $pRow['title'];
	$aTrainer = explode(' ', $sTrainer)[0];
	$trainers[$aTrainer]['attend'] += $isAttended;

	if(array_key_exists($nid, $rowsSorted)){
	// check if this registration belongs to any session/node in $rowsSorted

		$rowsSorted[$nid]['user_email'] .= '<br />'.$pRow['user_email'];
		$rowsSorted[$nid]['attended'] .= '<br />'.$pRow['attended'];
		$rowsSorted[$nid]['cancelled'] .= '<br />'.$pRow['cancelled'];
		$rowsSorted[$nid]['bypassed'] = '<br />'.$missedInfo;
		$rowsSorted[$nid]['confirmed'] .= '<br />'.$pRow['confirmed'];
		$rowsSorted[$nid]['registration_id'] .= '<br />'.$topic;

	}else{
	// this registration doesn't belongs to any session/node in $rowsSorted

		// create a new session array
		$rowsSorted[$nid]['nid'] = $pRow['nid'];

		// Reset each td CSS classes passed by Views module
		$field_classes['nid'][$nid] = $field_classes['nid'][$rowCount]; unset($field_classes['nid'][$rowCount]);

		// add total count to the date total column
		if(array_key_exists($aDate, $dates))$dates[$aDate]['total']++; else $dates[$aDate]['total'] = 1;
		$rowsSorted[$nid]['field_date_1'] = $sDate;
		$field_classes['field_date_1'][$nid] = $field_classes['field_date_1'][$rowCount]; unset($field_classes['field_date_1'][$rowCount]);

		// add total count to the time total column
		if(array_key_exists($aTime, $times)) $times[$aTime]['total']++; else $times[$aTime]['total'] = 1;
		$rowsSorted[$nid]['field_date'] = $pRow['field_date'];
		$field_classes['field_date'][$nid] = $field_classes['field_date'][$rowCount]; unset($field_classes['field_date'][$rowCount]);

		// add total count to the trainer total column
		if(array_key_exists($aTrainer, $trainers)) $trainers[$aTrainer]['total']++; else $trainers[$aTrainer]['total'] = 1;
		$rowsSorted[$nid]['title'] = $sTrainer;
		$field_classes['title'][$nid] = $field_classes['title'][$rowCount]; unset($field_classes['title'][$rowCount]);

		// add total count to the available column
		$avalInfo = $pRow['registration_available_slots'] ? 'O' : 'X';
		$avalInfo == 'O' ? $availableCount['O']++ : $availableCount['X']++;
		$rowsSorted[$nid]['registration_available_slots'] = $avalInfo;
		$field_classes['registration_available_slots'][$nid] = $field_classes['registration_available_slots'][$rowCount]; unset($field_classes['registration_available_slots'][$rowCount]);

		$rowsSorted[$nid]['user_email'] = $pRow['user_email'];
		$field_classes['user_email'][$nid] = $field_classes['user_email'][$rowCount]; unset($field_classes['user_email'][$rowCount]);

		$rowsSorted[$nid]['attended'] = $pRow['attended'];
		$field_classes['attended'][$nid] = $field_classes['attended'][$rowCount]; unset($field_classes['attended'][$rowCount]);

		$rowsSorted[$nid]['cancelled'] = $pRow['cancelled'];
		$field_classes['cancelled'][$nid] = $field_classes['cancelled'][$rowCount]; unset($field_classes['cancelled'][$rowCount]);

		$rowsSorted[$nid]['bypassed'] = $missedInfo;
		$field_classes['bypassed'][$nid] = $field_classes['bypassed'][$rowCount]; unset($field_classes['bypassed'][$rowCount]);

		$rowsSorted[$nid]['confirmed'] = $pRow['confirmed'];
		$field_classes['confirmed'][$nid] = $field_classes['confirmed'][$rowCount]; unset($field_classes['confirmed'][$rowCount]);

		$totalFeedback = $totalFeedback + $pRow['comment_count'];
		$rowsSorted[$nid]['comment_count'] = $pRow['comment_count'];
		$field_classes['comment_count'][$nid] = $field_classes['comment_count'][$rowCount]; unset($field_classes['comment_count'][$rowCount]);

		// upcoming column
		$rowsSorted[$nid]['views_conditional'] = $pRow['views_conditional'];
		$field_classes['views_conditional'][$nid] = $field_classes['views_conditional'][$rowCount]; unset($field_classes['views_conditional'][$rowCount]);

		// topics column
		$rowsSorted[$nid]['registration_id'] = $topic;
		$field_classes['registration_id'][$nid] = $field_classes['registration_id'][$rowCount]; unset($field_classes['registration_id'][$rowCount]);

		$nodeCount++;
	}
}

// sort arrays alphabetically acending
ksort($topics); ksort($trainers); ksort($times);
?>
<table <?php if ($classes) { print 'class="'. $classes . '" '; } ?><?php print $attributes; ?>>
   <?php if (!empty($title) || !empty($caption)) : ?>
     <caption><?php print $caption . $title; ?></caption>
  <?php endif; ?>
  <?php if (!empty($header)) : ?>
    <thead>
      <tr>
        <?php foreach ($header as $field => $label): ?>
          <th <?php if ($header_classes[$field]) { print 'class="'. $header_classes[$field] . '" '; } ?>>
            <?php print $label; ?>
          </th>
        <?php endforeach; ?>
      </tr>
    </thead>
  <?php endif; ?>
  <tbody>
    <?php foreach ($rowsSorted as $row_count => $row): ?>
      <tr <?php if ($row_classes[$row_count]) { print 'class="' . implode(' ', $row_classes[$row_count]) .'"';  } ?>>
        <?php foreach ($row as $field => $content): ?>
          <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php //print drupal_attributes($field_attributes[$field][$row_count]); ?>>
            <?php print $content; ?>
          </td>
        <?php endforeach; ?>
      </tr>
    <?php endforeach; ?>

			<tr class="totalRow">
				<td class="totalCol col-1"><b><?php print $nodeCount; ?></b> (Sessions)</td>
				<td class="totalCol col-2" style="text-align: right;"><?php array_walk($dates, "_display_attendance_vs_total"); ?></td>
				<td class="totalCol col-3" style="text-align: right;"><?php array_walk($times, "_display_attendance_vs_total"); ?></td>
				<td class="totalCol col-4" style="text-align: right;"><?php array_walk($trainers, "_display_attendance_vs_total"); ?></td>
				<td class="totalCol col-5"><b><?php print $availableCount['O']; ?></b> (Available)<br /><b><?php print $availableCount['X']; ?></b> (Used)</td>
				<td class="totalCol col-6"><b><?php print $userCount; ?></b> (Users)</td>
				<td class="totalCol col-7"><b><?php print $attendanceCount; ?></b> (Attended)</td>
				<td class="totalCol col-8"><b><?php print $cancelCount; ?></b> (Cancelled)</td>
				<td class="totalCol col-9"><b><?php print $missedCount; ?></b> (Missed)</td>
				<td class="totalCol col-10"><b><?php print $confirmedCount; ?></b> (Confirmed)</td>
				<td class="totalCol col-11"><b><?php print $totalFeedback; ?></b> (Feedback)</td>
				<td class="totalCol col-12"><b><?php print round(($availableCount['X'] / $nodeCount) * 100, 1) ?>%</b> (Used/Sessions)</td>
				<td class="totalCol col-13" style="text-align: right;"><?php array_walk($topics, "_display_total"); ?></td>

  </tbody>
</table>
